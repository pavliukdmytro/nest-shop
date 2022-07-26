import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post('/refresh')
  async refreshToken(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const refreshToken = request.cookies.refreshToken;
    if (refreshToken) {
      const tokenData = await this.tokenService.updateToken(refreshToken);
      if (
        tokenData &&
        'refreshToken' in tokenData &&
        'accessToken' in tokenData
      ) {
        response.cookie('refreshToken', tokenData.refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true,
        });
        response.json({
          isOk: true,
          accessToken: tokenData.accessToken,
        });
      } else {
        this.responseUnauthorized(response);
      }
    } else {
      this.responseUnauthorized(response);
    }
  }
  responseUnauthorized(response: Response) {
    response.status(HttpStatus.UNAUTHORIZED);
    response.json({
      isOk: false,
    });
  }
}
