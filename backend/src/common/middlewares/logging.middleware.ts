import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const start = Date.now();
    const end = () => {
      const ms = Date.now() - start;
      console.log(req.method, req.originalUrl, res.statusCode, ms + 'ms');
    };
    res.on('finish', end);
    next();
  }
}
