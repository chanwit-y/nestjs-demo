import { UserEntity } from 'src/entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegistraterDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  public async register(credentials: RegistraterDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();

      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);

      return { user: { ...user.toJson(), token } };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  public async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      if (user && user.comparePassword(password)) {
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);

        return { user: { ...user.toJson(), token } };
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
