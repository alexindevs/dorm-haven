import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  bio: string;

  @IsString()
  location: string;
}

export class UpdateAvatarDto {
  @IsNotEmpty()
  @IsString()
  avatar: string;
}

export class UpdateSchoolDto {
  @IsNotEmpty()
  @IsString()
  school: string;
}

export class UpdateThemeDto {
  @IsNotEmpty()
  @IsString()
  theme: string;
}
