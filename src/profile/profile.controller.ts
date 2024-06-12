import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
  CreateProfileDto,
  UpdateAvatarDto,
  UpdateSchoolDto,
  UpdateThemeDto,
} from './profile.dto';
import mongoose from 'mongoose';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async addProfile(@Body() createProfileDto: CreateProfileDto) {
    const { user_id, first_name, last_name, bio, location } = createProfileDto;
    return await this.profileService.addProfile(
      new mongoose.Types.ObjectId(user_id),
      first_name,
      last_name,
      bio,
      location,
    );
  }

  @Put(':userId/avatar')
  @UsePipes(new ValidationPipe())
  async addAvatar(
    @Param('userId') userId: string,
    @Body() updateAvatarDto: UpdateAvatarDto,
  ) {
    const { avatar } = updateAvatarDto;
    return await this.profileService.addAvatar(
      avatar,
      new mongoose.Types.ObjectId(userId),
    );
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    return await this.profileService.getProfile(
      new mongoose.Types.ObjectId(userId),
    );
  }

  @Put(':userId/school')
  @UsePipes(new ValidationPipe())
  async addSchool(
    @Param('userId') userId: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    const { school } = updateSchoolDto;
    return await this.profileService.addSchool(
      school,
      new mongoose.Types.ObjectId(userId),
    );
  }

  @Put(':userId/theme')
  @UsePipes(new ValidationPipe())
  async addTheme(
    @Param('userId') userId: string,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    const { theme } = updateThemeDto;
    return await this.profileService.addTheme(
      theme,
      new mongoose.Types.ObjectId(userId),
    );
  }
}
