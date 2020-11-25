import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(AppModule.PORT);
  console.log(`[ APP BASE NESTJS ] host run in ${AppModule.HTTP}://${AppModule.HOST}:${AppModule.PORT}`)
}
bootstrap();
