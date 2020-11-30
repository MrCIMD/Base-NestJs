import { CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Action } from "./action.entity";
import { Role } from "./role.entity";
import { Route } from "./route.entity";

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    // Relation with Role
    // A permission can have only a Role
    @ManyToOne(() => Role, (role) => role.permissions)
    role: Role;

    // Relation with Route
    // A permission can have only a Role
    @ManyToOne(() => Route, (route) => route.permissions)
    route: Route;
}