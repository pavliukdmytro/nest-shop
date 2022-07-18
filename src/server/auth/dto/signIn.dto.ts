import { MinLength, MaxLength, IsEmail } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
