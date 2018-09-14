import { DynamicModule, Global, Module } from '@nestjs/common';
import { Log4jsProvider } from './log4js.provider';
import { LOG4JS_CONFIG } from './log4js.constant';
import { Log4jsService } from './log4js.service';
import { Configuration } from 'log4js';
import { Log4jsFilter } from './log4js.filter';

@Global()
@Module({
  providers: [
    ...Log4jsProvider,
    Log4jsService,
    Log4jsFilter,
  ],
  exports: [
    ...Log4jsProvider,
    Log4jsService,
    Log4jsFilter,
  ],
})
export class Log4jsModule {
  static forRoot(configuration?: string | Configuration): DynamicModule {
    return {
      module: Log4jsModule,
      providers: [
        {
          provide: LOG4JS_CONFIG,
          useValue: configuration,
        },
      ],
      exports: [
        {
          provide: LOG4JS_CONFIG,
          useValue: configuration,
        },
      ],
    };
  }
}
