import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Render,
  Res,
  Req,
  HttpCode,
} from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Response, Request } from 'express';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/Validation.pipe';
import { ResponseDto } from '../dto/response.dto';
import { SignInDto } from './dto/signIn.dto';
import { ForgotDto } from './dto/forgot.dto';
import { TokenResponseDto } from './dto/tokenResponse.dto';
import { TokenDocument } from '../token/schemas/token.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @FormDataRequest()
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<ResponseDto> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/sign-in')
  @FormDataRequest()
  async signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenResponseDto> {
    const tokenData: TokenDocument = await this.authService.signIn(signInDto);
    response.cookie('refreshToken', tokenData.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return {
      isOk: true,
      accessToken: tokenData.accessToken,
    };
  }
  @Get('/verify/:token')
  @Render('confirm-email')
  async verifyEmail(@Param('token') token): Promise<any> {
    return await this.authService.verifyUser(token);
  }
  @Get('/logout')
  async logOut(@Req() request: Request): Promise<any> {
    try {
      const refreshToken = request.cookies.refreshToken;
      if (refreshToken) {
        await this.authService.logOut(refreshToken);
        return {
          isOk: true,
        };
      }
      return {
        isOk: false,
      };
    } catch (err) {
      console.error(err);
      return {
        isOk: false,
      };
    }
  }
  @Post('/forgot')
  @FormDataRequest()
  @HttpCode(200)
  async forgotPassword(
    @Body(new ValidationPipe()) forgotDto: ForgotDto,
  ): Promise<ResponseDto> {
    return await this.authService.forgotPassword(forgotDto.email);
  }
}
