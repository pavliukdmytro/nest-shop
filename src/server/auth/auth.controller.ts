import { Controller, Post, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../pipes/Validation.pipe';

interface Ret {
  status: boolean;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  @FormDataRequest()
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<Ret> {
    await this.authService.signUp(createUserDto);
    return { status: true };
  }
}
