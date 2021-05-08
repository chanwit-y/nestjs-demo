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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const abstract_entity_1 = require("./abstract-entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstracEntity {
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
    async comparePassword(attempt) {
        return await bcrypt.compare(attempt, this.password);
    }
    toJson() {
        return class_transformer_1.classToPlain(this);
    }
};
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], UserEntity.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ default: null, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity('users')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map