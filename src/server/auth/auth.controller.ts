import { Controller, Post, Body, Get, Param, Render, Res } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { Response } from 'express';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/Validation.pipe';
import { ResponseDto } from '../dto/response.dto';
import { SignInDto } from './dto/signIn.dto';

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
    @Res() response: Response,
  ): Promise<void> {
    const tokenData = await this.authService.signIn(signInDto);
    if ('refreshToken' in tokenData && 'accessToken' in tokenData) {
      response.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      response.json({
        isOk: true,
        accessToken: tokenData.accessToken,
      });
    } else {
      response.json(tokenData);
    }
  }
  @Get('/verify/:token')
  @Render('confirm-email')
  async verifyEmail(@Param('token') token): Promise<any> {
    return await this.authService.verifyUser(token);
  }
}
