import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController
{
  private userService: UserService;

  constructor(service: UserService)
  {
    this.userService = service;
  }

  @Post()
  postUserInfo(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  )
  {
    this.userService.addUser(createUserDto);
    response.status(HttpStatus.CREATED).send();
  }
}
