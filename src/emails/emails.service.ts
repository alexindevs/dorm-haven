import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const emailPass = process.env.EMAIL_PASS || 'problem';

@Injectable()
export class EmailsService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      debug: true,
      auth: {
        user: 'alexindevs@gmail.com',
        pass: emailPass,
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'Dorm Haven',
      to,
      subject,
      text: body,
    });
  }
}
