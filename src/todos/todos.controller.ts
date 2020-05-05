import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
  ParseBoolPipe,
  UseGuards,
} from '@nestjs/common';
import { ToDosService } from './to-dos.service';
import { classToPlain } from 'class-transformer';
import { Todo } from '../models/todo.model';
import { ObjectID } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
//
export class ToDosController {
  constructor(private todosService: ToDosService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllTodos() {
    const todosEntities = await this.todosService.getAllTodos();
    const todos = classToPlain(todosEntities);
    return todos;
  }

  @Get('complete')
  @UseGuards(AuthGuard('jwt'))
  async getTodos(@Query('iscomplete', new ParseBoolPipe()) isComplete) {
    let todosEntities: Todo[];

    if (isComplete) {
      todosEntities = await this.todosService.getCompletedTodos();
    } else {
      todosEntities = await this.todosService.getIncompleteTodos();
    }
    const todos = classToPlain(todosEntities);
    return todos;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getTodo(@Param('id') id: ObjectID): Promise<Todo> {
    return this.todosService.getTodo(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createTodo(@Body() todo: Todo) {
    return this.todosService.createTodo(todo);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updTodo(@Param('id') id: ObjectID, @Body() todo: Todo) {
    return this.todosService.updateTodo(id, todo);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTodo(@Param('id') id: ObjectID) {
    return this.todosService.deleteTodo(id);
  }
}
