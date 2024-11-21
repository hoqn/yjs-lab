import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  logger.log('Application is starting');
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: ['http://localhost:8080', 'http://frontend:8080'],
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
  logger.log('http://localhost:3000');
}
bootstrap();
