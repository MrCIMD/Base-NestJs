// Modulos
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// Controllers
import { FileController } from './storage.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: '/uploads',
    }),
  ],
  controllers: [FileController],
})
export class StorageModule { }
