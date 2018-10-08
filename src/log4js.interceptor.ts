import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LOG4JS_REQUEST_LOGGER, LOG4JS_RESPONSE_LOGGER } from './log4js.constant';
import { Logger } from 'log4js';
import { Log4jsInterceptorAbstract } from './log4js.interceptor.abstract';
import { stringify } from 'circular-json-es6';

@Injectable()
export class Log4jsInterceptor extends Log4jsInterceptorAbstract {
  constructor(
    @Inject(LOG4JS_REQUEST_LOGGER) protected requestLogger: Logger,
    @Inject(LOG4JS_RESPONSE_LOGGER) protected responseLogger: Logger,
  ) {
    super(requestLogger, responseLogger);
  }

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return super.intercept(context, call$);
  }

  requestFormat(httpRequest: any): string {
    return stringify({
      url: httpRequest.url,
      method: httpRequest.method,
      params: httpRequest.params,
      query: httpRequest.query,
      body: httpRequest.body,
      httpVersion: httpRequest.httpVersion,
      headers: httpRequest.headers,
      route: httpRequest.route,
    });
  }

  responseFormat(httpResponse: any): string {
    return stringify(httpResponse);
  }
}