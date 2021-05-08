import { AuthPayload } from './../models/user.model';
import { UserEntity } from './../entities/user.entity';
import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepo;
    constructor(userRepo: Repository<UserEntity>);
    validate(payload: AuthPayload): Promise<UserEntity[]>;
}
export {};
