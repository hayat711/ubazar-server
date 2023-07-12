import {
    BadRequestException, ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {CreateAccountDto} from "./dto/create-account.dto";
import {Request} from "express";
import {LoginDto} from "./dto/login.dot";
import * as argon from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import {User} from "../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import RequestWithUser, {AuthRequest} from "./dto/req-with-user.dto";
import { InvalidCredentials, UniqueViolation } from "../common/exceptions";
import { MongoErrorCode } from "../common/enums/postgres-error.enum";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {
    }


    public async register(registrationData: CreateAccountDto, req: Request){
        console.log('registrationData', registrationData);
        try{
            const user = await this.userService.create(registrationData);

            const [accessToken, refreshToken] = await this.generateToken(user);

            await this.setToken(req, { accessToken, refreshToken});
            return {
                user,
                accessToken,
            }
        } catch (err: any) {
            if(err.code == PostgresErrorCode.UniqueViolation) {
                if(err.detail.includes('email')) {
                    throw new UniqueViolation('email')
                }

                if(err.detail.includes('nick_name' || 'nick' || 'nickName')) {
                    throw new UniqueViolation('nickName')
                }
            }
            throw new InternalServerErrorException()
        }
    }

    public async login(credentials: LoginDto, req: Request) {
        try{
            const { email, password } = credentials;
            const user = await  this.getAuthenticatedUser(email, password);
            const [accessToken, refreshToken] = await this.generateToken(user);
            await this.setToken(req, { accessToken, refreshToken})

            return {
                user,
                accessToken,
            }
        } catch (err) {
            throw new HttpException(err.response, err.status);
        }
    }

    public async logout(req: RequestWithUser) {
        if (req.cookies && req.cookies['refresh_token']) {
            const refreshTokenCookie = req.cookies['refresh_token'];
            const verifiedRefresh = await this.jwtService.verifyAsync(refreshTokenCookie, {
                secret: this.configService.get('JWT_REFRESH_SECRET_KEY')
            })

        }

        req.res.clearCookie('access_token');
        req.res.clearCookie('refresh_token');
    }


    private async generateToken(user: User) {
        const jwtid = nanoid();


        const accessToken = await this.jwtService.signAsync({
            displayName: user.firstName,
            id: user.id
        }, {
            issuer: 'Hayat',
            secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME')
        })

        const refreshToken = await this.jwtService.signAsync({
            displayName: user.firstName,
            id: user.id
        }, {
            jwtid,
            issuer: 'Hayat',
            secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
        })

        return [accessToken, refreshToken];
    }
    // set the cookies to access/refresh token in browser
    private async setToken(req: Request, { accessToken, refreshToken}:
        { accessToken:string, refreshToken?: string} ) {
        console.log('the set token called');
        req.res.cookie('access_token', accessToken, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            sameSite: 'lax'
        })

        if(refreshToken) {
            req.res.cookie('refresh_token', refreshToken, {
                maxAge: 1000 * 60 * 60* 24* 30,
                httpOnly: true,
                sameSite: true,
            })
        }
    }



    public async refreshTokens(req: Request) {
        const refreshTokenCookie = req.cookies['refresh_token']
        if (!refreshTokenCookie) {
            throw new UnauthorizedException('Invalid cookie')
        }

        const verifiedJwt = await this.jwtService.verifyAsync(refreshTokenCookie, {
            secret: this.configService.get('JWT_REFRESH_SECRET_KEY')
        })

        if (!verifiedJwt) {
            throw new UniqueViolation('Invalid refresh token');
        }

        const accessToken = await this.jwtService.signAsync({
            displayName: verifiedJwt.displayName,
            id: verifiedJwt.id
        }, {
            issuer: 'Hayat',
            secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),

        })

        await this.setToken(req, { accessToken})
        const user = await this.userService.getUserByField('id', verifiedJwt.id)
        return user;
    }

    public async getAuthenticatedUser(email: string, password: string){
        try {
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new InvalidCredentials();
            }
            const isMatch = await argon.verify(user.password, password);
            if (!isMatch) {
                throw new InvalidCredentials()
            }
            return user;
        } catch (err) {
            throw err;
        }
    }




}
