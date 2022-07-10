import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [NestjsFormDataModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
