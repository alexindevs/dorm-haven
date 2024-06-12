import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  CreateAccountDto,
  LoginDto,
  VerifyEmailDto,
  VerifyUserDto,
  StartPasswordResetDto,
  ResetPasswordDto,
  LogoutDto,
} from './authentication.dto';
import mongoose from 'mongoose';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.authenticationService.createAccount(
      createAccountDto.email,
      createAccountDto.password,
      createAccountDto.username,
      createAccountDto.role,
    );
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto.email, loginDto.password);
  }

  @Post('verify-email')
  @UsePipes(new ValidationPipe())
  async startVerifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authenticationService.startVerifyEmail(verifyEmailDto.email);
  }

  @Post('verify-user')
  @UsePipes(new ValidationPipe())
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return this.authenticationService.verifyUser(verifyUserDto.token);
  }

  @Post('start-password-reset')
  @UsePipes(new ValidationPipe())
  async startPasswordReset(
    @Body() startPasswordResetDto: StartPasswordResetDto,
  ) {
    return this.authenticationService.startPasswordReset(
      startPasswordResetDto.email,
    );
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authenticationService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }

  @Post('logout')
  @UsePipes(new ValidationPipe())
  async logout(@Body() logoutDto: LogoutDto) {
    return this.authenticationService.logout(
      new mongoose.Types.ObjectId(logoutDto.userId),
    );
  }
}
