import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from '../config/acebase';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  server.on('ready', () =>
    console.log('AceBase Server running @ localhost:5757'),
  );
  await app.listen(8000);
}
bootstrap();
