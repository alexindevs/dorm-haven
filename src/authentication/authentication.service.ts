import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './authentication.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AccessTokenService } from './accesstoken.service';
import { RefreshTokenService } from './refreshtoken.service';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly emailsService: EmailsService,
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

  }
}
