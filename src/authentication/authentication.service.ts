import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './authentication.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AccessTokenService } from './accesstoken.service';
import { RefreshTokenService } from './refreshtoken.service';
import { EmailsService } from 'src/emails/emails.service';
import { isEmail } from 'class-validator';
import { OtpService } from 'src/otp/otp.service';
import mongoose from 'mongoose';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly emailsService: EmailsService,
    private readonly otpService: OtpService,
  ) {}

  async createAccount(
    email: string,
    password: string,
    username: string,
    role: string,
  ): Promise<{ account: AccountDocument; accessToken: string }> {
    const hash = await bcrypt.hash(password, 10);
    const newAccount = new this.accountModel({
      email,
      password: hash,
      username,
      role,
      verified: false,
    });
    const account = await newAccount.save();
    const accessToken = this.accessTokenService.generateAccessToken(newAccount);
    await this.refreshTokenService.addNewToken(newAccount._id);
    return {
      account,
      accessToken,
    };
  }

  async login(email: string, password: string) {
    const user = await this.accountModel.findOne({ email });
    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
      };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return {
        status: 'error',
        message: 'Invalid password',
      };
    }

    const accessToken = this.accessTokenService.generateAccessToken(user);
    await this.refreshTokenService.replaceToken(user._id);
    return {
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken,
        user,
      },
    };
  }

  async startVerifyEmail(email: string) {
    const account = await this.accountModel.findOne({
      email,
    });
    if (!account) {
      return {
        status: 'error',
        message: 'Account not found',
      };
    }

    if (account.verified) {
      return {
        status: 'error',
        message: 'Account already verified',
      };
    }
    if (isEmail(account.email)) {
      const OTP = await this.otpService.generate(
        '20m',
        account._id,
        'Email Verification',
      );

      const subject = 'Verification Code';
      const body =
        'Your verification code is: ' +
        OTP.token +
        '. It will expire in 20 minutes.';
      await this.emailsService.sendEmail(account.email, subject, body);
      return {
        message: 'Email with verification code sent successfully',
        data: null,
      };
    }
  }

  /**
   * Verifies a user using a token and user ID.
   *
   * @param {string} token - The token to verify the user.
   * @param {string} userId - The ID of the user to verify.
   * @return {Promise<SuccessResponse>} A promise that resolves to a SuccessResponse object.
   */
  async verifyUser(token: string): Promise<{ message: string; data: any }> {
    const verified = await this.otpService.verifyOtp(token);
    if (!verified) {
      return {
        message: 'Token has expired',
        data: null,
      };
    }
    const newUser = await this.accountModel.findOneAndUpdate(
      { _id: verified.user_id },
      { verified: true },
      { new: true },
    );
    return {
      message: 'User verified successfully. You can now login.',
      data: newUser,
    };
  }

  async startPasswordReset(email: string) {
    const account = await this.accountModel.findOne({ email });
    if (!account) {
      return {
        status: 'error',
        message: 'Account not found',
      };
    }

    const OTP = await this.otpService.generate(
      '20m',
      account._id,
      'Password Reset',
    );

    const subject = 'Password Reset';
    const body =
      'Your password reset code is: ' +
      OTP.token +
      '. It will expire in 20 minutes.';
    await this.emailsService.sendEmail(account.email, subject, body);
    return {
      message: 'Email with password reset code sent successfully',
      data: null,
    };
  }

  async resetPassword(token: string, password: string) {
    const verified = await this.otpService.verifyOtp(token);
    if (!verified) {
      return {
        message: 'Token has expired',
        data: null,
      };
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.accountModel.findOneAndUpdate(
      { _id: verified.user_id },
      { password: hash },
      { new: true },
    );
    return {
      message: 'Password reset successful. You can now login.',
      data: newUser,
    };
  }

  async logout(userId: mongoose.Types.ObjectId) {
    await this.refreshTokenService.invalidateToken(userId);
    return {
      message: 'Logged out Successfully, please login again.',
      data: null,
    };
  }

  async getProfileByUserId(userId: mongoose.Types.ObjectId) {
    return await this.accountModel.findOne({ _id: userId }).populate('profile');
  }

  async getUserById(userId: mongoose.Types.ObjectId) {
    return await this.accountModel.findById(userId);
  }
}
