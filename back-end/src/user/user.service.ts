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
    let dtoDate = new Date(dto.dateOfBirth);
    const user = <User>{
      id: UserService.idCounter++,
      dateOfBirth: dtoDate,
      age: (new Date()).getFullYear() - dtoDate.getFullYear(),
    };
    this.users.push(user);

    return user.id;
  }
}
