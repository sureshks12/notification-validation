import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from "@nestjs/common";
import { KafkaProducerService } from "../kafka-producer/kafka-producer.service";
import { NotifyService } from "./notify.service";
import { CreateNotifyDTO } from "./dto/create-notify.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { LoggerService } from "../logger/logger.service";

@Controller("notify")
export class NotifyController {
  constructor(
    private readonly notifyService: NotifyService,
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly logger: LoggerService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createNotifyDto: CreateNotifyDTO) {
    this.logger.log(
      `Received create request with data: ${JSON.stringify(createNotifyDto)}`
    );

    try {
      await this.kafkaProducerService.sendMessage(
        "test-topic",
        createNotifyDto
      );
      return { message: "Message sent to Kafka" };
    } catch (error) {
      this.logger.error("Failed to send message to Kafka", error.stack);
      throw new InternalServerErrorException("Failed to send message to Kafka");
    }
  }
}

