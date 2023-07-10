import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { CurrentUser } from "../common/decorators";
import AddCreditCardDto from "./Dto/CreditCardDto";
import { StripeService } from "../stripe/stripe.service";
import { User } from "../user/entities/user.entity";
import { EmailConfirmGuard } from "../common/guards/email.confirm.guard";

@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCreditCard(@Body() creditCard: AddCreditCardDto, @CurrentUser('id') userId: string){
    return await this.stripeService.attachCreditCard(creditCard.paymentMethodId, userId);
  }

  @Get()
  @UseGuards(EmailConfirmGuard)
  @UseGuards(JwtAuthGuard)
  async getCreditCards(@CurrentUser() user: User) {
    return this.stripeService.listCreditCards(user.stripCustomerId);
  }
}
