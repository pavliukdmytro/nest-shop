import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenderEnum } from '../enums/gender.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  avatar: string;
  @Prop({ enum: Object.values(GenderEnum) })
  gender: string;
  @Prop()
  roles: string[];
  @Prop({ default: Date.now() })
  created: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
