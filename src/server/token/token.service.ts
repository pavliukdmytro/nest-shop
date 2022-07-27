import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import { Model, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IToken } from './interfaces/ITocken';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}
  async createToken(data: any, userId: Types.ObjectId): Promise<TokenDocument> {
    return await this.tokenModel.create({
      refreshToken: uuid(),
      accessToken: this.jwtService.sign(data),
      userId,
    });
  }
  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
  async updateToken(refreshToken: string): Promise<TokenDocument | null> {
    try {
      const tokenData: TokenDocument = await this.tokenModel
        .findOneAndDelete({ refreshToken })
        .populate('userId', '-password');
      const tokenObject: IToken = tokenData?.toObject();
      if (tokenObject) {
        return this.createToken(tokenObject.userId, tokenData.userId._id);
      }
      return null;
    } catch (err) {
      console.error(err);
    }
  }
  async removeToken(refreshToken: string): Promise<any> {
    return this.tokenModel.findOneAndDelete({ refreshToken });
  }
}
