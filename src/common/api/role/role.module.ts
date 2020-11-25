// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
// Controllers
import { RoleController } from './role.controller';
// Services
import { RoleService } from './role.service';
import { Role } from '../../entities/role.entity';
// Entities

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
