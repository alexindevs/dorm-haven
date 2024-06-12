import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { EmailsService } from '../emails/emails.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema, RefreshTokenSchema } from './authentication.schema';
import { OtpModule } from 'src/otp/otp.module';
import { AccessTokenService } from './accesstoken.service';
import { RefreshTokenService } from './refreshtoken.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Account',
        schema: AccountSchema,
      },
      {
        name: 'RefreshToken',
        schema: RefreshTokenSchema,
      },
    ]),
    OtpModule,
  ],
  providers: [
    AuthenticationService,
    AccessTokenService,
    RefreshTokenService,
    EmailsService,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
