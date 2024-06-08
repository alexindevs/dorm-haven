import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './authentication.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
  ) {}

  async createAccount(
    email: string,
    password: string,
    username: string,
    role: string,
  ): Promise<AccountDocument> {
    const newAccount = new this.accountModel({
      email,
      password,
      username,
      role,
      verified: false,
    });

    return newAccount.save();
  }
}
