import { Body, Controller, Post } from "@nestjs/common";
import EmailService from "./email.service";
import { ConfirmEmailDto } from "./Dto/email.confirmation.dto";
import { CurrentUser } from "../common/decorators";


@Controller('email-confirmation')


export class EmailController{
  constructor(private readonly emailService:EmailService) {
  }

  @Post(`confirm`)
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailService.decodeConfirmationToken(confirmationData.token);
    await this.emailService.confirmEmail(email);
  }

  @Post('ressend-confirmation-link')
  async resendConfirmationLink(@CurrentUser('id') userId: string) {
    await this.emailService.resendConfirmationLink(userId);
  }
}