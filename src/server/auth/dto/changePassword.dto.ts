import { MinLength, MaxLength, IsJWT } from 'class-validator';
export class ChangePasswordDto {
  @MinLength(6)
  @MaxLength(25)
  password: string;
  @MinLength(6)
  @MaxLength(25)
  confirmPassword: string;
  @IsJWT()
  token: string;
}
