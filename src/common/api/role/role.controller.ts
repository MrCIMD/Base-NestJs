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
import { RoleService } from './role.service';
import { DeleteResult, UpdateResult } from 'typeorm';

import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../general/guards/role.guard';
import { Role } from '../../entities/role.entity';
import { Roles } from '../../general/decorators/roles.decorator';

@UseGuards(AuthGuard(), RoleGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly _service: RoleService) {}

  @Roles('ADMINISTRATOR')
  @Post()
  public async create(@Body() role: Role): Promise<Role> {
    return await this._service.create(role);
  }

  @Get()
  public async getAll(): Promise<Role[]> {
    return await this._service.findAll();
  }

  @Get('deleted')
  public async getDeleted(): Promise<Role[]> {
    return await this._service.findDeleted();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<Role> {
    return await this._service.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() role: Role,
  ): Promise<UpdateResult> {
    return this._service.update(id, role);
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
