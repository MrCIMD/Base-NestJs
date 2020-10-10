import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Profile } from './entities/profile.entity';
import { ExceptionMessageEnum } from './../../general';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private repository: Repository<Profile>,
  ) {}

  public async create(profile: Profile): Promise<Profile> {
    return await this.repository.save(profile);
  }

  public async findAll(): Promise<Profile[]> {
    return await this.repository.find();
  }

  public async findDeleted(): Promise<Profile[]> {
    return (await this.repository.find({ withDeleted: true })).filter(
      obj => obj.deletedAt !== null,
    );
  }

  public async findOne(id: string): Promise<Profile> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    const profile: Profile = await this.repository.findOne(id);
    if (!profile) {
      throw new NotFoundException(ExceptionMessageEnum.ENTITY_NOT_FOUND);
    }
    return profile;
  }

  public async update(id: string, profile: Profile): Promise<UpdateResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.update(id, profile);
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
