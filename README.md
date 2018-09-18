## Description
This's a [log4js](https://github.com/log4js-node/log4js-node) module for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install nest-log4js
```

## Quick Start

Logger is a global module in general, so I just list global usage.

If you want to Manual logger, see provider bottom, inject and log.

### Include Module

>app.module.ts

```ts
import { Log4jsModule } from 'nest-log4js';
@Module({
    imports: [
        ...
         Log4jsModule.forRoot(config),
    ]
})
export class AppModule {
}

```
[Optional Settings](https://log4js-node.github.io/log4js-node/api.html)
is inspired by official settings

If you use Interceptor, you should ensure 'response' and 'request' in your config categories.

If you use Filter, you should ensure 'error' in your config categories.

### Using Interceptor
Interceptor is provided for logging request and response, you can also implement your Interceptor by extend.

>app.module.ts

```ts
import { Log4jsInterceptor } from 'nest-log4js';
@Module({
     providers: [{
        provide: 'LOG4JS_INTERCEPTOR',
        useClass: Log4jsInterceptor,
      }],
})
export class AppModule {
}
```

### System logger

>main.ts

```ts
import { Log4jsService } from 'nest-log4js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(app.get(Log4jsService));
  await app.listen(3000);
}
```

### Using filter
Filter is provided for logging error, you can also implement your Filter by extend.

> main.ts

```ts
import { Log4jsFilter } from 'nest-log4js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useGlobalFilters(app.get(Log4jsFilter));
  await app.listen(3000);
}
```

### Provider

LOG4JS_CONFIG: your config

LOG4JS_PROVIDER: configure(config): Logger

LOG4JS_REQUEST_LOGGER

LOG4JS_RESPONSE_LOGGER

LOG4JS_ERROR_LOGGER 

### Tips

If you use pm2, please look [clustering](https://log4js-node.github.io/log4js-node/clustering.html)