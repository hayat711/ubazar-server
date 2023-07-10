import {Body, Controller, Delete, Get, HttpCode, Post, Query, Req, Res, UseGuards} from '@nestjs/common';
import {CreateAccountDto} from "./dto/create-account.dto";
import {Request, Response} from 'express'
import {LoginDto} from "./dto/login.dot";
import RequestWithUser, {AuthRequest} from "./dto/req-with-user.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(201)
  @Post('register')
  async register(
      @Body() credentials: CreateAccountDto,
      @Req() req: Request) {
    console.log('auth route is called');

    return this.authService.register(credentials, req);
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
