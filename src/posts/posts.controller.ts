import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostService } from './posts.service';
import mongoose from 'mongoose';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body('userId') userId: mongoose.Types.ObjectId,
    @Body('content') content: string,
    @Body('images') images: string[],
  ) {
    return this.postService.createPost(userId, content, images);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') postId: mongoose.Types.ObjectId) {
    return this.postService.getPostById(postId);
  }

  @Put(':id')
  async updatePost(
    @Param('id') postId: mongoose.Types.ObjectId,
    @Body('content') content: string,
    @Body('images') images: string[],
  ) {
    return this.postService.updatePost(postId, content, images);
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: mongoose.Types.ObjectId) {
    return this.postService.deletePost(postId);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') postId: mongoose.Types.ObjectId,
    @Body('userId') userId: mongoose.Types.ObjectId,
    @Body('content') content: string,
  ) {
    return this.postService.addComment(userId, postId, content);
  }

  @Get(':id/comments')
  async getCommentsByPostId(@Param('id') postId: mongoose.Types.ObjectId) {
    return this.postService.getCommentsByPostId(postId);
  }

  @Post(':id/likes')
  async likePost(
    @Param('id') postId: mongoose.Types.ObjectId,
    @Body('userId') userId: mongoose.Types.ObjectId,
  ) {
    return this.postService.likePost(userId, postId);
  }

  @Delete(':id/likes')
  async unlikePost(
    @Param('id') postId: mongoose.Types.ObjectId,
    @Body('userId') userId: mongoose.Types.ObjectId,
  ) {
    return this.postService.unlikePost(userId, postId);
  }

  @Get(':id/likes')
  async getLikesByPostId(@Param('id') postId: mongoose.Types.ObjectId) {
    return this.postService.getLikesByPostId(postId);
  }
}
