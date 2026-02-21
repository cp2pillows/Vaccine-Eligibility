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
      age: (new Date()).getFullYear() - dto.dateOfBirth.getFullYear(),
    };
    this.users.push(user);

    return user.id;
  }
}
