import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  avatar: string;

  @Prop({
    required: true,
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  bio: string;

  @Prop()
  location: string;

  @Prop()
  school: string;

  @Prop({ enum: ['light', 'dark'], default: 'light' })
  theme_preference: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
