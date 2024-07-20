// import {
//   Controller,
//   Post,
//   Body,
//   UseGuards,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { NotifyService } from './notify.service';
// import { CreateNotifyDTO } from './dto/create-notify.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/role.decorator';
// import { Role } from '../auth/role.enum';
// import { KafkaProducerService } from '../kafka-producer/kafka-producer.service';
// import { InternalServerErrorException } from '@nestjs/common';

// @Controller('notify')
// export class NotifyController {
//   constructor(
//     private readonly notifyService: NotifyService,
//     private readonly kafkaProducerService: KafkaProducerService,
//   ) {}

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(Role.Admin, ['read', 'write'])
//   @Post()
//   @UsePipes(new ValidationPipe())
//   async create(@Body() createNotifyDto: CreateNotifyDTO) {
//     try {
//       await this.kafkaProducerService.sendMessage(
//         'test-topic',
//         createNotifyDto,
//       ); // Replace 'test-topic' with your Kafka topic
//       return this.notifyService.create(createNotifyDto);
//     } catch (error) {
//       console.error('Error in controller:', error);
//       throw new InternalServerErrorException('Failed to send message to Kafka');
//     }
//   }
// }
