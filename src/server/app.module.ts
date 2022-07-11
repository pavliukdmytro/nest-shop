import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

console.log(process.env.CONNECTIONSTRING);
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.CONNECTIONSTRING),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
