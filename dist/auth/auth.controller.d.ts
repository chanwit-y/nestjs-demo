import { LoginDTO, RegistraterDTO } from '../models/user.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(credentials: RegistraterDTO): Promise<{
        user: {
            token: string;
        };
    }>;
    login(credentials: LoginDTO): Promise<{
        user: {
            token: string;
        };
    }>;
}
