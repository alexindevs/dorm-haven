import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './authentication.schema';
import jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenService {
  private readonly secret: string;

  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {
    this.secret = process.env.JWT_SECRET || 'wahala';
  }

  async addNewToken(userId: mongoose.Types.ObjectId): Promise<boolean> {
    const token = jwt.sign({ user_id: userId }, this.secret, {
      expiresIn: '14d',
    });
    await this.refreshTokenModel.create({
      token,
      user_id: userId,
    });

    return true;
  }

  async checkTokenValidity(userId: mongoose.Types.ObjectId): Promise<{
    isValid: boolean;
    message: string;
  }> {
    const tokenDoc = await this.refreshTokenModel.findOne({
      user_id: userId,
    });

    try {
      jwt.verify(tokenDoc.token, this.secret);
      return {
        isValid: true,
        message: 'Refresh Token found and checked successfully',
      };
    } catch (error: any) {
      return {
        isValid: false,
        message: error.message,
      };
    }
  }

  async replaceToken(userId: mongoose.Types.ObjectId): Promise<any> {
    try {
      const tokenDoc = await this.refreshTokenModel.findOne({
        user_id: userId,
      });
      if (!tokenDoc) {
        await this.addNewToken(userId);
        return {
          message: 'Token Added Successfully',
          data: null,
        };
      }
      const token = jwt.sign({ user_id: userId }, this.secret, {
        expiresIn: '14d',
      });
      await this.refreshTokenModel.updateOne(
        { user_id: userId },
        { token: token },
      );
      return {
        message: 'Token Updated Successfully',
        data: null,
      };
    } catch (error) {
      return {
        message: 'Failed to update token',
        data: error,
      };
    }
  }

  async invalidateToken(userId: mongoose.Types.ObjectId): Promise<any> {
    const tokenDoc = await this.refreshTokenModel.findOne({
      user_id: userId,
    });
    if (!tokenDoc) {
      return {
        message: 'User ID not valid',
        data: null,
      };
    }
    await this.refreshTokenModel.findOneAndDelete({ user_id: userId });
    return {
      message: 'Logged out Successfully, please login again.',
      data: null,
    };
  }
}
