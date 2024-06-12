import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Post,
  PostDocument,
  PostComments,
  PostCommentsDocument,
  PostLikes,
  PostLikesDocument,
} from './posts.schema';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostComments.name)
    private postCommentsModel: Model<PostCommentsDocument>,
    @InjectModel(PostLikes.name)
    private readonly accountService: AuthenticationService,
    private postLikesModel: Model<PostLikesDocument>,
  ) {}

  async createPost(
    userId: mongoose.Types.ObjectId,
    content: string,
    images: string[] = [],
  ): Promise<Post> {
    const user = await this.accountService.getProfileByUserId(userId);
    const location = user.profile.location;
    const newPost = new this.postModel({
      user_id: userId,
      content,
      images,
      location,
      created_at: new Date(),
    });
    return newPost.save();
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().populate('user_id').exec();
  }

  async getTimelinePosts(user_id: mongoose.Types.ObjectId): Promise<Post[]> {
    const user = await this.accountService.getUserById(user_id);
    const user_profile = user.profile;
    return this.postModel
      .find({
        location: user_profile.location,
        created_at: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
        user_id: { $ne: user_id },
      })
      .populate('user_id')
      .sort({ created_at: -1, likes: -1, comments: -1 })
      .exec();
  }

  async getPostById(postId: mongoose.Types.ObjectId): Promise<Post> {
    const post = await this.postModel
      .findById(postId)
      .populate('user_id')
      .exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePost(
    postId: mongoose.Types.ObjectId,
    content: string,
    images: string[] = [],
  ): Promise<Post> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(postId, { content, images }, { new: true })
      .exec();
    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }
    return updatedPost;
  }

  async deletePost(postId: mongoose.Types.ObjectId): Promise<void> {
    const result = await this.postModel.findByIdAndDelete(postId).exec();
    if (!result) {
      throw new NotFoundException('Post not found');
    }
  }

  async addComment(
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    content: string,
  ): Promise<PostComments> {
    const newComment = new this.postCommentsModel({
      user_id: userId,
      post_id: postId,
      content,
      created_at: new Date(),
    });
    return newComment.save();
  }

  async getCommentsByPostId(
    postId: mongoose.Types.ObjectId,
  ): Promise<PostComments[]> {
    return this.postCommentsModel
      .find({ post_id: postId })
      .populate('user_id')
      .exec();
  }

  async likePost(
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
  ): Promise<PostLikes> {
    const newLike = new this.postLikesModel({
      user_id: userId,
      post_id: postId,
    });
    return newLike.save();
  }

  async unlikePost(
    userId: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await this.postLikesModel
      .findOneAndDelete({ user_id: userId, post_id: postId })
      .exec();
  }

  async getLikesByPostId(
    postId: mongoose.Types.ObjectId,
  ): Promise<PostLikes[]> {
    return this.postLikesModel
      .find({ post_id: postId })
      .populate('user_id')
      .exec();
  }
}
