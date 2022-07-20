import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RoleEnum } from '../user/enums/role.enum';
import { ResponseDto } from '../dto/response.dto';
import { SignInDto } from './dto/signIn.dto';
import { IUser } from '../user/interfaces/user.interface';
import { EmailService } from '../email/email.service';
import { UserDocument } from '../user/schemas/user.schema';

interface IAccessToken {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly emailService: EmailService
  ) {}
  async compareHash(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
  async signUp(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const user: UserDocument = await this.userService.createUser(createUserDto, [
        RoleEnum.user,
      ]);
      const token = this.signUser(user);
      this.emailService.sendEmail(
        user.email,
        'verify your email',
        `<p>fallow this link
                <a href="http://localhost:3000/auth/verify/${token.responseData.access_token}">website</a>
                </p>`,
      );
      return {
        isOk: true,
        messages: {
          verify: 'visit your email',
        },
      };
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

    if (user.status === 'pending') {
      error.errors.auth.one = 'please visit your email and fallow to the link';
      return error;
    }

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
  decodeJwt(token: string): any {
    return this.jwtService.decode(token);
  }
  async verifyUser(token: string): Promise<ResponseDto> {
    try {
      const parsedToken: any = this.decodeJwt(token);
      await this.userService.updateUser(
        { email: parsedToken.email },
        { status: 'active' },
      );
      return {
        isOk: true,
        messages: {
          verify: 'your email has confirmed',
        },
      };
    } catch (err) {
      return {
        isOk: false,
        errors: {
          token: 'bad token',
        },
      };
    }
  }
}
