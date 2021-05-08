import { BaseEntity } from 'typeorm';
export declare abstract class AbstracEntity extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
}
