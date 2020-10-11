import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Role } from './entities/role.entity';
import { ExceptionMessageEnum } from './../../general';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  public async create(role: Role): Promise<Role> {
    return await this.repository.save(role);
  }

  public async findAll(): Promise<Role[]> {
    return await this.repository.find();
  }

  public async findDeleted(): Promise<Role[]> {
    return (await this.repository.find({ withDeleted: true })).filter(
      obj => obj.deletedAt !== null,
    );
  }

  public async findOne(id: string): Promise<Role> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    const role: Role = await this.repository.findOne(id);
    if (!role) {
      throw new NotFoundException(ExceptionMessageEnum.ENTITY_NOT_FOUND);
    }
    return role;
  }

  public async update(id: string, role: Role): Promise<UpdateResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.update(id, role);
  }

  public async delete(id: string): Promise<UpdateResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.softDelete(id);
  }

  public async restore(id: string): Promise<UpdateResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.restore(id);
  }

  public async remove(id: string): Promise<DeleteResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.delete(id);
  }
}
