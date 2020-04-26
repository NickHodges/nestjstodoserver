import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Todo } from './models/todo.model';
import { User } from './models/user.model';
import { ToDosController } from './todos/todos.controller';
import { ToDosService } from './todos/to-dos.service';
import { AuthenticationMiddleware } from './middleware/authentication.middlesware';
import { AuthzModule } from './authz/authz.module';

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
    TypeOrmModule.forFeature([User]),
    AuthzModule,
  ],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '/todos', method: RequestMethod.ALL });
  }
}
