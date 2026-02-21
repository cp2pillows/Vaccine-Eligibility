import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService
{
  private users: User[] = [];
  private static idCounter: number = 0;

  addUser(dto: CreateUserDto): number
  {
    const user = <User>{
      id: UserService.idCounter++,
      dateOfBirth: dto.dateOfBirth,
      ethnicity: dto.ethnicity,
    };
    this.users.push(user);

    return user.id;
  }
}
