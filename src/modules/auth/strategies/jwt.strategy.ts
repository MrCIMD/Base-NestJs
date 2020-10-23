import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { IJwt } from '../interface';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _config: ConfigService,
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _config.get(Configuration.APP_SECRET_KEY),
    });
  }

  public async validate(ijwt: IJwt) {
    const { email } = ijwt;
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return ijwt;
  }
}
