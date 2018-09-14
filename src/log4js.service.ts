import { Logger, Injectable, Inject } from '@nestjs/common';
import { LOG4JS_PROVIDER } from './log4js.constant';
import { Log4js } from 'log4js';

@Injectable()
export class Log4jsService extends Logger {
  constructor(@Inject(LOG4JS_PROVIDER) private Log4js: Log4js) {
    super();
  }

  log(message: string, context: string) {
    super.log(message, context);
    const resLogger = this.Log4js.getLogger('system');
    resLogger.info(message, context);
  }

  error(message: string, trace: string, context: string) {
    super.error(message, trace, context);
    const errLogger = this.Log4js.getLogger('error');
    errLogger.error(message, trace, context);
  }

  warn(message: string, context: string) {
    super.warn(message, context);
    const errLogger = this.Log4js.getLogger('warn');
    errLogger.error(message, context);
  }
}