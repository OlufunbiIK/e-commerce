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

  // **This starts the server**
  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Log the Swagger URL in the terminal
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}
bootstrap();
