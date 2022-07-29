import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RoleEnum } from '../user/enums/role.enum';
import { ResponseDto } from '../dto/response.dto';
import { SignInDto } from './dto/signIn.dto';
import { IUser } from '../user/interfaces/user.interface';
import { EmailService } from '../email/email.service';
import { UserDocument } from '../user/schemas/user.schema';
import { TokenService } from '../token/token.service';
import { TokenDocument } from '../token/schemas/token.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}
  async compareHash(password: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
  async signUp(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const user: UserDocument = await this.userService.createUser(
        createUserDto,
        [RoleEnum.user],
      );

      const { accessToken } = await this.signUser(user);
      this.emailService.sendEmail(
        user.email,
        'verify your email',
        `<p>fallow this link
                <a href="http://localhost:3000/auth/verify/${accessToken}">website</a>
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
  async signIn({ email, password }: SignInDto): Promise<TokenDocument> {
    const user: IUser | null = await this.validateUser({ email, password });
    const error: ResponseDto = {
      isOk: false,
      errors: {
        auth: { one: 'wrong login or password' },
      },
    };
    if (!user) {
      throw new BadRequestException(error);
    }

    if (user.status === 'pending') {
      error.errors.auth.one = 'please visit your email and fallow to the link';
      throw new BadRequestException(error);
    }

    return await this.signUser(user);
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
  async signUser(user): Promise<TokenDocument> {
    delete user._doc.password;
    user._doc.sub = user.id;
    return await this.tokenService.createToken(user._doc, user.id);
  }
  async verifyUser(token: string): Promise<ResponseDto> {
    try {
      const parsedToken: any = this.tokenService.decodeToken(token);
      await this.userService.updateUser(
        { email: parsedToken.email },
        { status: 'active' },
      );
      return {
        isOk: true,
        messages: {
          verify: 'Your email has confirmed, please sign in.',
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
  async logOut(refreshToken: string): Promise<any> {
    return await this.tokenService.removeToken(refreshToken);
  }
  async forgotPassword(email: string): Promise<ResponseDto> {
    const userData = await this.userService.findByEmail(email, '-password');
    if (!userData) {
      throw new BadRequestException({
        isOk: false,
        errors: {
          email: {
            empty: 'email isn`t present',
          },
        },
      });
    }
    const { SERVER_HOST_STRING, SERVER_PORT } = process.env;
    const token: string = this.tokenService.signData(userData.toObject());
    this.emailService.sendEmail(
      email,
      'follow the link to update your password',
      `<a href="${SERVER_HOST_STRING}:${SERVER_PORT}/auth/change-password/${token}">
                follow the link to update your password
              </a>`,
    );
    return {
      isOk: true,
      messages: {
        email: 'visit your email',
      },
    };
  }
}
