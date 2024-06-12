// I don't want to overcomplicate things.
// An account will have: email, password, username, role, verified, profile
// A profile will have: first name, last name, bio, avatar, phone number, location, school

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;
export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    enum: ['student', 'non-student', 'admin'],
    required: true,
    default: 'student',
  })
  role: string;

  @Prop({ default: false })
  verified: boolean;

  // @Prop()
  // profile: Profile;
}

@Schema()
export class RefreshToken {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  user_id: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
