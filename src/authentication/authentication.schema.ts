// I don't want to overcomplicate things.
// An account will have: email, password, username, role, verified, profile
// A profile will have: first name, last name, bio, avatar, phone number, location, school

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;
export type RefreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema()
export class Account {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  role: string;

  @Prop()
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
