import { LOG4JS_PROVIDER, LOG4JS_CONFIG, LOG4JS_REQUEST_LOGGER, LOG4JS_RESPONSE_LOGGER, LOG4JS_ERROR_LOGGER } from './log4js.constant';
import { configure, Log4js, Logger, Configuration } from 'log4js';

export const Log4jsProvider = [
  {
    provide: LOG4JS_PROVIDER,
    useFactory: (config: any): Log4js => {
      return configure(config);
    },
    inject: [LOG4JS_CONFIG],
  },
  {
    provide: LOG4JS_REQUEST_LOGGER,
    useFactory: (log4js: Log4js): Logger => {
      return log4js.getLogger('request');
    },
    inject: [LOG4JS_PROVIDER],
  },
  {
    provide: LOG4JS_RESPONSE_LOGGER,
    useFactory: (log4js: Log4js): Logger => {
      return log4js.getLogger('response');
    },
    inject: [LOG4JS_PROVIDER],
  },
  {
    provide: LOG4JS_ERROR_LOGGER,
    useFactory: (log4js: Log4js): Logger => {
      return log4js.getLogger('error');
    },
    inject: [LOG4JS_PROVIDER],
  },
];
