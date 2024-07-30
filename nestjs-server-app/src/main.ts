import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3012;
  Logger.log(`Application running on port ${port}`);
  await app.listen(port);
}
bootstrap();
