import { BadRequestException, Injectable } from "@nestjs/common";
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import { JwtService } from "@nestjs/jwt";
import { VerificationTokenPayload } from "./verification.token";
import { UserService } from "../user/user.service";


@Injectable()
export default class EmailService {
  private nodemailerTransport : Mail;

  constructor( private readonly configService: ConfigService,
               private readonly jwtService: JwtService,
               private readonly userService: UserService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      }
    });
  }

  public async confirmEmail(email:string) {
    const user = await this.userService.getUserByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = {email};
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Welcome to the UBazar. to confirm the email address, click here: ${url}`;

    return this.sendMail({
      to: email,
      subject: 'Email confirmation',
      text
    })
  }

  public async decodeConfirmationToken(token:string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (e) {
      if (e?.name === 'TokenExpiredError'){
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token')
    }
  }


  public async resendConfirmationLink(userId : string) {
    const user = await this.userService.getUserById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user.email);
  }

  private sendMail(options: Mail.Options){
    return this.nodemailerTransport.sendMail(options);
  }

}