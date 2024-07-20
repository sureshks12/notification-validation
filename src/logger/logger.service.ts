import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService extends Logger {
  private readonly logFilePath: string;

  constructor() {
    super();
    this.logFilePath = path.join(process.env.LOGFILEPATH); 
  }

  log(message: string) {
    const logMessage = `[${new Date().toISOString()}] [NotifyLog] ${message}`;
    super.log(logMessage);
    this.writeToFile(logMessage);
  }

  error(message: string, trace: string) {
    const errorMessage = `[${new Date().toISOString()}] [error] ${message} \n${trace}`;
    super.error(errorMessage);
    this.writeToFile(errorMessage);
  }

  warn(message: string) {
    const warnMessage = `[${new Date().toISOString()}] [Warning Message] ${message}`;
    super.warn(warnMessage);
    this.writeToFile(warnMessage);
  }
  private writeToFile(message: string) {
    fs.appendFileSync(this.logFilePath, message + '\n');
  }
}
