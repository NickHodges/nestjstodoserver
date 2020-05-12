import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
//import passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`./${process.env.KEYFILE}`),
    cert: fs.readFileSync(`./${process.env.CRTFILE}`),
  };

  const TodoServer = await NestFactory.create(AppModule, { httpsOptions });
  TodoServer.enableCors({
    credentials: true,
    origin: true,
  });
  TodoServer.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    })
  );

  await TodoServer.listen(process.env.PORT);
  console.log(`Application is running on: ${await TodoServer.getUrl()}`);
}
bootstrap();
