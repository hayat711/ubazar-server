import {Body, Controller, Delete, Get, HttpCode, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {CreateAccountDto} from "./dto/create-account.dto";
import {Request, Response} from 'express'
import {LoginDto} from "./dto/login.dot";
import RequestWithUser, {AuthRequest} from "./dto/req-with-user.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { AuthService } from "./auth.service";
import EmailService from "../email/email.service";
import { User } from "../user/entities/user.entity";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly emailService: EmailService) {}


  @HttpCode(201)
  @Post('register')
  async register (
      @Body() credentials: CreateAccountDto,
      @Req() req: Request)  {
    console.log('auth route is called');

    const user = this.authService.register(credentials, req);
    await this.emailService.sendVerificationLink(credentials.email);
    return user;
  }

  @HttpCode(200)
  @Post('login')
  async login(
      @Body() credentials: LoginDto,
      @Req() req: Request
  ){
    return this.authService.login(credentials, req);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req);
  }
  

}
