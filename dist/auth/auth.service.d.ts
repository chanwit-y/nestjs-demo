import { UserEntity } from 'src/entities/user.entity';
import { LoginDTO, RegistraterDTO } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<UserEntity>, jwtService: JwtService);
    register(credentials: RegistraterDTO): Promise<{
        user: {
            token: string;
        };
    }>;
    login({ email, password }: LoginDTO): Promise<{
        user: {
            token: string;
        };
    }>;
}
