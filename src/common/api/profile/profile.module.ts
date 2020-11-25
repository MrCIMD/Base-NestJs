// Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
// Controllers
import { ProfileController } from './profile.controller';
// Services
import { ProfileService } from './profile.service';
// Entities
import { Profile } from '../../entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
