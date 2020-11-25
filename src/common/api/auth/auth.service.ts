import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { IJwt, IToken } from './interface';
import { AuthDto } from './dto/auth.dtb';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo, private readonly jwt: JwtService) {
    super(repo);
  }

  public async signup(user: User) {
    const { email } = user;
    const userExists = await this.repo.findOne({ where: [{ email }] });
    if (userExists) {
      throw new ConflictException('Already exists');
    }
    const auth = await this.create(user);
    return this.generateToken(auth);
  }

  public async signin(authDto: AuthDto): Promise<IToken> {
    const { email, password } = authDto;
    const user = await this.repo.findOne({
      where: [{ email }],
      relations: ['profile', 'company', 'roles'],
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): IToken {
    const payload: IJwt = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwt.sign(payload);
    const decod: any = this.jwt.decode(token);
    return { user, token, exp: decod.exp };
  }

  public async create(newuser: User): Promise<User> {
    const { password } = newuser;
    const salt = await genSalt(10);
    newuser.password = await hash(password, salt);
    return await this.repo.save(newuser);
  }
}
