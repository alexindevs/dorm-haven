import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PostCommentsSchema,
  PostLikesSchema,
  PostSchema,
} from './posts.schema';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'PostComments', schema: PostCommentsSchema },
      { name: 'PostLikes', schema: PostLikesSchema },
    ]),
  ],
  providers: [PostService, AuthenticationService],
  controllers: [PostController],
})
export class PostsModule {}
