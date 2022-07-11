import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUser } from './interfaces/user.interface';
// import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    createUserDto: CreateUserDto,
    roles: string[],
  ): Promise<IUser> {
    return await this.userModel.create({
      ...createUserDto,
      roles: roles,
    });
  }
}
