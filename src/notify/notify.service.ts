import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateNotifyDTO } from './dto/create-notify.dto';
import { validateOrReject } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class NotifyService {
  constructor(private readonly logger:LoggerService){

  }
  async create(createNotifyDto: CreateNotifyDTO): Promise<any> {
    try {
      await validateOrReject(createNotifyDto);
      // If validation passes, return the validated data
      return { message: 'Validation passed', data: createNotifyDto };
    } catch (errors) {
      this.logger.error('validation Failed',errors)
      // throw new BadRequestException('validation Failed');
    }
  }
}
