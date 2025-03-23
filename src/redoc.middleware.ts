import { INestApplication, RequestHandler } from '@nestjs/common/interfaces';
import redoc from 'redoc-express';

export function setupRedoc(app: INestApplication<any>) {
  const redocOptions = {
    title: 'Your API Title',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions) as RequestHandler);
}
