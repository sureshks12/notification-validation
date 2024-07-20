import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import * as fs from 'fs';


@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(
    @Inject()
    private readonly logger: LoggerService,
  ) {
    let caCert: string;
    try {
      caCert = fs.readFileSync('config/kafka/ca.crt', 'utf-8');
    } catch (error) {
      this.logger.error(`Error reading CA certificate file at:`, error);
      throw error;
    }

    this.kafka = new Kafka({
      clientId: 'nestjs-kafka-client',
      brokers: ['143.110.181.228:9093'],
      //  brokers: ['10.20.178.42:1895'],

      ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
        ca: [caCert],
      },
      sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      },
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      this.logger.error('Error sending message to Kafka:', error);
      throw new error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
