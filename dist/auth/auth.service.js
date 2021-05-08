"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_entity_1 = require("../entities/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("../models/user.model");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async register(credentials) {
        try {
            const user = this.userRepo.create(credentials);
            await user.save();
            const payload = { username: user.username };
            const token = this.jwtService.sign(payload);
            return { user: Object.assign(Object.assign({}, user.toJson()), { token }) };
        }
        catch (err) {
            if (err.code === '23505') {
                throw new common_1.ConflictException('Username has already been taken');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.userRepo.findOne({ where: { email } });
            if (user && user.comparePassword(password)) {
                const payload = { username: user.username };
                const token = this.jwtService.sign(payload);
                return { user: Object.assign(Object.assign({}, user.toJson()), { token }) };
            }
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map