import { User } from '../../../entities/user.entity';

export interface IToken {
  token: string;
  user: User;
  exp: Date;
}
