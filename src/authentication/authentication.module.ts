import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { EmailsService } from '../emails/emails.service';

@Module({
  providers: [AuthenticationService, EmailsService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
