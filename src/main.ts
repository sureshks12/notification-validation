import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggerService } from './logger/logger.service';


async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const logger = app.get(LoggerService);
 

  await app.listen(3000);
}
bootstrap();
