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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dtb';
import { IToken } from './interface';
import { User } from '../../entities/user.entity';

@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      profile: { eager: true },
      company: { eager: true },
      roles: { eager: true },
    },
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('auth')
export class AuthController implements CrudController<User> {
  constructor(public service: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  public async signup(@Body() user: User): Promise<IToken> {
    return this.service.signup(user);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  public async signin(@Body() authDto: AuthDto): Promise<IToken> {
    return this.service.signin(authDto);
  }
}
