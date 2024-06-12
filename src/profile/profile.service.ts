import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './profile.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async addProfile(
    user_id: mongoose.Types.ObjectId,
    first_name: string,
    last_name: string,
    bio: string,
    location: string,
  ) {
    const newProfile = new this.profileModel({
      user_id,
      first_name,
      last_name,
      bio,
      location,
    });
    return await newProfile.save();
  }

  async addAvatar(avatar: string, user_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findOneAndUpdate(
      { user_id },
      { avatar },
      { new: true },
    );
  }

  async getProfile(user_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findOne({ user_id });
  }

  async addSchool(school: string, user_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findOneAndUpdate(
      { user_id },
      { school },
      { new: true },
    );
  }

  async addTheme(theme: string, user_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findOneAndUpdate(
      { user_id },
      { theme_preference: theme },
      { new: true },
    );
  }

  async getProfileByUserId(user_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findOne({ user_id });
  }

  async deleteProfile(profile_id: mongoose.Types.ObjectId) {
    return await this.profileModel.findByIdAndDelete(profile_id);
  }
}
