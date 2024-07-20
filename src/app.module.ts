// src/app.module.ts

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyModule } from './notify/notify.module';
import { AuthModule } from './auth/auth.module';
import { NotifyController } from './notify/notify.controller';
import { AuthController } from './auth/auth.controller';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaProducerService } from './kafka-producer/kafka-producer.service';
import { LoggerModule } from './logger/logger.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [KafkaModule, NotifyModule, AuthModule, LoggerModule],
  controllers: [AppController, AuthController, NotifyController],
  providers: [AppService, KafkaProducerService, JwtAuthGuard, JwtService, ],
})
export class AppModule {}
