import { DataInterceptor } from './utils/data.interceptor';
import { DataPipe } from './utils/data.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { ToDosController } from './todos/todos.controller';
import { ToDosService } from './todos/to-dos.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'TodoDB',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Todo]),
    AuthModule,
  ],
  controllers: [ToDosController],
  providers: [
    ToDosService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: DataPipe,
    },
  ],
})
export class AppModule {}
