import { Controller } from '@nestjs/common';
import { KafkaProducerService } from '../kafka-producer/kafka-producer.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {
    console.log()
  }
}
