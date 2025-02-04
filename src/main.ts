import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';
import { CommonFilter } from './filters/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')  
  const config = new DocumentBuilder()
    .setTitle('Turbo chat service')
    .setDescription('A light weight chat service to interact with people')
    .setVersion('1.0')
    .addTag('Turbo')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.useGlobalFilters(new MongooseExceptionFilter(), new CommonFilter())
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
