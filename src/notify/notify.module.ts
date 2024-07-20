import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { AuthModule } from '../auth/auth.module';
import { KafkaProducerService } from '../kafka-producer/kafka-producer.service';
import { LoggerService } from 'src/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule],
  controllers: [NotifyController],
  providers: [NotifyService, KafkaProducerService, LoggerService,JwtService],
  exports: [NotifyService],
})
export class NotifyModule {}
