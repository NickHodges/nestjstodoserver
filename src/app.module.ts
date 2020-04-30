import { AuthenticationMiddleware } from './utils/authentication.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { ToDosController } from './todos/todos.controller';
import { ToDosService } from './todos/to-dos.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'TodoDB',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Todo])
  ],
  controllers: [ToDosController],
  providers: [ToDosService]
})
export class AppModule {}
