import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response/data-response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }, //converts strings to numbers
    }),
  );
  app.useGlobalInterceptors(new DataResponseInterceptor());
}
bootstrap();
