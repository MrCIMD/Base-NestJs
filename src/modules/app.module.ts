// Module
import { Module } from '@nestjs/common';
import { ProfileModule } from '../common/api/profile/profile.module';
import { RoleModule } from '../common/api/role/role.module';
import { AuthModule } from '../common/api/auth/auth.module';
// Modules custom
import { ConfigModule } from '../common/config/config.module';
import { DatabaseModule } from '../common/database/database.module';
// Services
import { ConfigService } from '../common/config/config.service';
// Enum
import { Configuration } from '../common/config/config.keys';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ProfileModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(Configuration.APP_PORT);
  }
}
