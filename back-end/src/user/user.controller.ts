import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
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
    const userId: number = this.userService.addUser(createUserDto);
    response.status(HttpStatus.CREATED);
    response.cookie('userId', userId, {
      httpOnly: true,
      secure: true,
      sameSite: false,
      maxAge: 86400 * 1000,
    });
    response.send();
  }
}
