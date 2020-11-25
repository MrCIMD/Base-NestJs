import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto/auth.dtb';
import { IJwt, IToken } from './interface';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';
import { Profile } from '../../entities/profile.entity';
import { ExceptionMessageEnum } from '../../general/enums/exception-message.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwt: JwtService,
  ) {}

  public async signup(authDto: AuthDto) {
    const { email } = authDto;
    const userExists = await this.repository.findOne({ where: [{ email }] });
    if (userExists) {
      throw new ConflictException(ExceptionMessageEnum.ALREADY_EXISTS);
    }
    const user = await this.create(authDto);
    return this.generateToken(user);
  }

  public async signin(authDto: AuthDto): Promise<IToken> {
    const { email, password } = authDto;
    const user = await this.repository.findOne({ where: [{ email }] });
    if (!user) {
      throw new NotFoundException(ExceptionMessageEnum.USER_DOES_NOT_EXIST);
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(ExceptionMessageEnum.INVALID_CREDENTIALS);
    }

    return this.generateToken(user);
  }

  public async create(authDto: AuthDto): Promise<User> {
    const { email, password } = authDto;
    const user = new User();
    user.email = email;
    user.profile = new Profile();
    user.roles = [];
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    return await this.repository.save(user);
  }

  private generateToken(user: User): IToken {
    const payload: IJwt = {
      id: user.id,
      email: user.email,
      roles: user.roles.map(r => r.name),
    };
    const token = this.jwt.sign(payload);
    const decod: any = this.jwt.decode(token);
    return { user, token, exp: decod.exp };
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  public async findDeleted(): Promise<User[]> {
    return (await this.repository.find({ withDeleted: true })).filter(
      obj => obj.deletedAt !== null,
    );
  }

  public async findOne(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    const user: User = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException(ExceptionMessageEnum.ENTITY_NOT_FOUND);
    }
    return user;
  }

  public async update(id: string, user: User): Promise<UpdateResult> {
    if (!id) {
      throw new BadRequestException(ExceptionMessageEnum.ID_MUST_BE_SENT);
    }
    return await this.repository.update(id, user);
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

  public async setRole(userId: string, roleId: string): Promise<User> {
    const user: User = await this.repository.findOne(userId);
    if (!user) {
      throw new NotFoundException(
        `user ${ExceptionMessageEnum.ENTITY_NOT_FOUND}`,
      );
    }
    const role: Role = await this.roleRepository.findOne(roleId);
    if (!role) {
      throw new NotFoundException(
        `role ${ExceptionMessageEnum.ENTITY_NOT_FOUND}`,
      );
    }
    const existsRoleInUser = user.roles.filter(r => r.name === role.name);
    if (existsRoleInUser.length === 0) {
      user.roles.push(role);
      await this.repository.save(user);
    }
    return user;
  }

  public async removeRole(userId: number, roleId: number): Promise<User> {
    const user: User = await this.repository.findOne(userId);
    if (!user) {
      throw new NotFoundException(
        `user ${ExceptionMessageEnum.ENTITY_NOT_FOUND}`,
      );
    }
    user.roles = user.roles.filter(r => r.id !== roleId);
    return await this.repository.save(user);
  }
}
