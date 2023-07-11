import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as cors from 'cors'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  app.use(cors()); // Habilita o middleware CORS

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
