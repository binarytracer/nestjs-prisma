import { INestApplication } from '@nestjs/common/interfaces';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupScalar(app: INestApplication<any>) {
  const config = apiReference({
    theme: 'alternative',
    url: '/api-json',
  });

  app.use('/reference', config);
}
