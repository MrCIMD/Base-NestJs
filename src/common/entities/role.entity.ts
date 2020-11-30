import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 20, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // Relation with User
  // A role can have many users
  @OneToMany(() => User, user => user.role)
  users: User[];

  // Relation with Permission
  // A role can have many permissions
  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
