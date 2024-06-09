import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './authentication.schema';
import jwt from 'jsonwebtoken';

@Injectable()
export class AccessTokenService {
  private readonly secret: string;

  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {
    this.secret = process.env.JWT_SECRET || 'wahala';
  }

  generateAccessToken(user: any): string {
    const { _id } = user;
    const accessToken = jwt.sign(
      { userId: _id, identifier: user.identifier },
      this.secret,
      { expiresIn: '1d' },
    );
    return accessToken;
  }

  async getAccountFromToken(token: string): Promise<AccountDocument> {
    const { payload } = this.verifyAccessToken(token);
    const user = await this.accountModel.findOne({ _id: payload.userId });
    return user;
  }

  verifyAccessToken(token: string): { isValid: boolean; payload?: any } {
    try {
      const payload = jwt.verify(token, this.secret);
      return { isValid: true, payload };
    } catch (error) {
      const payload = jwt.decode(token);
      return { isValid: false, payload };
    }
  }
}
