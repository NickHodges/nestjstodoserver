import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
//import passport from 'passport';

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
  // TodoServer.use(passport.initialize());
  // TodoServer.use(passport.session());
  await TodoServer.listen(3000);
  console.log(`Application is running on: ${await TodoServer.getUrl()}`);
}
bootstrap();
