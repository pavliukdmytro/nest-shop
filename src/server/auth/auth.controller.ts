import { Controller, Post, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/Validation.pipe';
import { ResponseDto } from '../dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  @FormDataRequest()
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<ResponseDto> {
    return await this.authService.signUp(createUserDto);
  }
}
