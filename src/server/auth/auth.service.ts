import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RoleEnum } from '../user/enums/role.enum';
import { ResponseDto } from '../dto/response.dto';
import { SignInDto } from './dto/signIn.dto';
import { IUser } from '../user/interfaces/user.interface';

interface IAccessToken {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async compareHash(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
  async signUp(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const user: IUser = await this.userService.createUser(createUserDto, [
        RoleEnum.user,
      ]);
      return this.signUser(user);
    } catch (err) {
      return {
        isOk: false,
        errors: {
          email: {
            uniq: `${createUserDto.email} is present`,
          },
        },
      };
    }
  }
  async signIn({
    email,
    password,
  }: SignInDto): Promise<IAccessToken | ResponseDto> {
    const user: IUser | null = await this.validateUser({ email, password });
    const error: ResponseDto = {
      isOk: false,
      errors: {
        auth: { one: 'wrong login or password' },
      },
    };
    if (!user) return error;

    return this.signUser(user);
  }
  async validateUser({ email, password }: SignInDto): Promise<IUser | null> {
    const user: IUser | null = await this.userService.findByEmail(email);
    if (!user) return null;
    const isPasswordValid: boolean = await this.compareHash(
      password,
      user.password,
    );
    if (!isPasswordValid) return null;
    return user;
  }
  signUser(user) {
    delete user._doc.password;
    user._doc.sub = user.id;
    return {
      isOk: true,
      responseData: {
        access_token: this.jwtService.sign(user._doc),
      },
    };
  }
}
