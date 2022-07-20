import { Document } from 'mongoose';
import { StatusEnum } from '../enums/status.enum';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly gender: string;
  readonly roles: string[];
  readonly created: number;
  readonly status: StatusEnum;
}
