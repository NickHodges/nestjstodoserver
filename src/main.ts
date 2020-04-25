import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./Nicklocalhost.key'),
    cert: fs.readFileSync('./Nicklocalhost.crt'),
  };
  const TodoServer = await NestFactory.create(AppModule, { httpsOptions });
  TodoServer.enableCors({
    credentials: true,
    origin: true,
  });
  await TodoServer.listen(3000);
}
bootstrap();
