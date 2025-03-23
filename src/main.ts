import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setupRedoc } from './redoc.middleware';
import { setupScalar } from './scalar.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs + Prisma API')
    .setDescription('Nestjs + Prisma API description')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  setupRedoc(app);
  setupScalar(app);

  const port = process.env.PORT ?? 3000;
  console.log(`Running in port: ${port}`);
  await app.listen(port);
}
void bootstrap();
