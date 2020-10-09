// Module
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
// Services
import { ConfigService } from '../config/config.service';
// Enum
import { Configuration } from '../config/config.keys';

@Module({
  imports: [ConfigModule],
})
export class AppModule {
  static PORT: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.PORT = this._configService.get(Configuration.APP_PORT);
  }
}
