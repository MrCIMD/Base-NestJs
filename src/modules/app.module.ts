// Module
import { Module } from '@nestjs/common';
// Modules custom
import { ProfileModule } from '../common/api/profile/profile.module';
import { RoleModule } from '../common/api/role/role.module';
import { AuthModule } from '../common/api/auth/auth.module';
import { ConfigModule } from '../common/config/config.module';
import { DatabaseModule } from '../common/database/database.module';
import { StorageModule } from '../common/storage/storage.module';
// Services
import { ConfigService } from '../common/config/config.service';
// Enum
import { Configuration } from '../common/config/config.keys';
// Config
import { RequestQueryBuilder } from '@nestjsx/crud-request';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ProfileModule,
    RoleModule,
    AuthModule,
    StorageModule
  ],
})
export class AppModule {
  static PORT: number | string;
  static HTTP: string;
  static HOST: string;
  constructor(private readonly _configService: ConfigService) {
    RequestQueryBuilder.setOptions({
      delim: '$$',
    })
    AppModule.PORT = this._configService.get(Configuration.APP_PORT);
    AppModule.HTTP = this._configService.get(Configuration.APP_HTTP_PROTOCOL);
    AppModule.HOST = this._configService.get(Configuration.APP_HOST);
  }
}
