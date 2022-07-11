import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RoleEnum } from '../user/enums/role.enum';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signUp(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const user = await this.userService.createUser(createUserDto, [
        RoleEnum.user,
      ]);

      return {
        status: true,
        messages: { greeting: `Hello, ${createUserDto.name}` },
      };
    } catch (err) {
      // console.error(err);
      return {
        status: false,
        errors: {
          email: {
            uniq: `${createUserDto.email} is present`,
          },
        },
      };
    }
  }
}
