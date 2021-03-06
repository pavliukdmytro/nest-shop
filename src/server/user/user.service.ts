import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { StatusEnum } from './enums/status.enum';

@Injectable()
export class UserService {
  private readonly saltRound = 10;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async hashPassword(password): Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }
  async createUser(
    createUserDto: CreateUserDto,
    roles: string[],
  ): Promise<UserDocument> {
    return await this.userModel.create({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
      status: StatusEnum.pending,
      roles,
    });
  }
  async findByEmail(email: string, options?: string): Promise<IUser> {
    return await this.userModel.findOne({ email }, options);
  }
  async findByEmailAndUpdate(email: string, props: any): Promise<IUser> {
    return await this.userModel.findOneAndUpdate({ email }, props);
  }
  async updateUser(search: any, params: any) {
    return await this.userModel.findOneAndUpdate(search, params);
  }
}
