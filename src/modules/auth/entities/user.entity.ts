import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './../../profile/entities/profile.entity';
import { Role } from './../../role/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  // Relation with Profile
  // A user can have only a profile
  @OneToOne(type => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  // Relation with Roles
  // A user can have many roles
  @ManyToMany(
    type => Role,
    role => role.users,
    { eager: true },
  )
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
