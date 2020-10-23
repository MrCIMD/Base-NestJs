import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly _envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      this._envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this._envConfig = {
        APP_PORT: process.env.APP_PORT,
        APP_SECRET_KEY: process.env.APP_SECRET_KEY,
        TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
        TYPEORM_HOST: process.env.TYPEORM_HOST,
        TYPEORM_PORT: process.env.TYPEORM_PORT,
        TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
        TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
        TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
        TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
        TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
        TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,
      };
    }
  }

  public get(key: string): string {
    return this._envConfig[key];
  }
}
