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
import { AuthDto } from './dto/auth.dtb';
import { AuthService } from './auth.service';
import { IToken } from './interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly _service: AuthService) {}

  @UseGuards(AuthGuard())
  @Get()
  public async getAll(): Promise<User[]> {
    return await this._service.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('deleted')
  public async getDeleted(): Promise<User[]> {
    return await this._service.findDeleted();
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<User> {
    return await this._service.findOne(id);
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  public async signup(@Body() authDto: AuthDto): Promise<IToken> {
    return this._service.signup(authDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  public async signin(@Body() authDto: AuthDto): Promise<IToken> {
    return this._service.signin(authDto);
  }

  @Post('set-role/:userId/:roleId')
  @UsePipes(ValidationPipe)
  public async setRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<User> {
    return this._service.setRole(userId, roleId);
  }

  @Post('remove-role/:userId/:roleId')
  @UsePipes(ValidationPipe)
  public async removeRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ): Promise<User> {
    return this._service.removeRole(userId, roleId);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<UpdateResult> {
    return this._service.update(id, user);
  }

  @UseGuards(AuthGuard())
  @Put(':id/restore')
  public async restore(@Param('id') id: string): Promise<UpdateResult> {
    return this._service.restore(id);
  }

  @UseGuards(AuthGuard())
  @Put(':id/delete')
  public async delete(@Param('id') id: string): Promise<UpdateResult> {
    return this._service.delete(id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this._service.remove(id);
  }
}
