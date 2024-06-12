import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;
export type PostCommentsDocument = HydratedDocument<PostComments>;
export type PostLikesDocument = HydratedDocument<PostLikes>;

@Schema()
export class Post {
  @Prop({
    required: true,
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true, length: 500 })
  content: string;

  @Prop({ default: [], type: [String] })
  images: string[];

  @Prop({ required: true })
  location: string;

  @Prop({ default: Date.now })
  created_at: Date;

  likes: number;
  comments: PostComments[];
}

@Schema()
export class PostComments {
  @Prop({
    required: true,
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: 'Post', type: mongoose.Schema.Types.ObjectId })
  post_id: mongoose.Types.ObjectId;

  @Prop({ required: true, length: 500 })
  content: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

@Schema()
export class PostLikes {
  @Prop({
    required: true,
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true, ref: 'Post', type: mongoose.Schema.Types.ObjectId })
  post_id: mongoose.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export const PostCommentsSchema = SchemaFactory.createForClass(PostComments);
export const PostLikesSchema = SchemaFactory.createForClass(PostLikes);
