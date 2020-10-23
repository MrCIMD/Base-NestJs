import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('profiles')
export class ProfileController {
  constructor(private readonly _service: ProfileService) {}

  @Post()
  public async create(@Body() profile: Profile): Promise<Profile> {
    return await this._service.create(profile);
  }

  @Get()
  public async getAll(): Promise<Profile[]> {
    return await this._service.findAll();
  }

  @Get('deleted')
  public async getDeleted(): Promise<Profile[]> {
    return await this._service.findDeleted();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Profile> {
    return await this._service.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() profile: Profile,
  ): Promise<UpdateResult> {
    return this._service.update(id, profile);
  }

  @Put(':id/restore')
  public async restore(@Param('id') id: string): Promise<UpdateResult> {
    return this._service.restore(id);
  }

  @Put(':id/delete')
  public async delete(@Param('id') id: string): Promise<UpdateResult> {
    return this._service.delete(id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this._service.remove(id);
  }
}
