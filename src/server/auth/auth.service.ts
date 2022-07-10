import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    this.userService.createUser(createUserDto);
  }
}
