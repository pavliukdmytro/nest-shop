import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly gender: string;
  readonly roles: string[];
  readonly created: number;
}
