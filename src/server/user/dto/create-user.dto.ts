import {
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsEnum,
} from 'class-validator';

// import { StatusEnum } from '../enums/status.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(6)
  @MaxLength(25)
  readonly password: string;
  readonly avatar: string;
  @IsEnum(['male', 'female'])
  readonly gender: string;
  // @IsEnum(Object.values(StatusEnum))
  // readonly status: string;
}
