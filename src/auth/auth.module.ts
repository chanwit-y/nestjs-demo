import { UserEntity } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      expiresIn: 3600, 
    }
  }),
  PassportModule.register({
    defaultStrategy: 'jwt'
  })
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
