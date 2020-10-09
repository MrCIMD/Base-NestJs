// Module
import { Module } from '@nestjs/common';
// Modules custom
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
// Services
import { ConfigService } from '../config/config.service';
// Enum
import { Configuration } from '../config/config.keys';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(Configuration.APP_PORT);
  }
}
