import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject } from '@nestjs/common';
import { LoggerService,} from 'src/logger/logger.service';


@Catch()
export class KafkaExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    // Enhanced logging with more details
    const logMessage = `Exception caught:
      Path: ${request.url}
      Method: ${request.method}
      Status: ${status}
      Message: ${JSON.stringify(message)}
      Stack: ${exception instanceof Error ? exception.stack : 'N/A'}`;
    
    this.logger.error(logMessage, exception instanceof Error ? exception.stack : 'N/A');

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
