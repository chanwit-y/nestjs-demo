import { AbstracEntity } from './abstract-entity';
export declare class UserEntity extends AbstracEntity {
    email: string;
    username: string;
    bio: string;
    image: string | null;
    password: string;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
    toJson(): Record<string, any>;
}
