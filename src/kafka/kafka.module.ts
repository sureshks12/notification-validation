import { Module } from '@nestjs/common';
import { KafkaProducerService } from '../kafka-producer/kafka-producer.service';
import { KafkaController } from './kafka.controller';

@Module({
  providers: [KafkaProducerService],
  controllers: [KafkaController],
})
export class KafkaModule {}
