import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response/data-response';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('e-commerce group project')
    .setDescription('API documentation for e-commerce api project')
    .setVersion('1.0')
    .addBearerAuth() // If using JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }, //converts strings to numbers
    }),
  );
  app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);

  // Log the Swagger URL in the terminal
  console.log(`Swagger Server is running on: http://localhost:3000/api/docs`);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
bootstrap();
