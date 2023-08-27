import { Module } from "@nestjs/common";
import EmailService from "./email.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module(
  {
    imports: [UserModule,
      JwtModule.registerAsync({
        imports: [ConfigModule, ],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_ACCESS_EXPIRATION_TIME')
          }
        })
      })
    ],
    exports: [EmailService],
    providers: [EmailService],

  }
)
export class EmailModule {}