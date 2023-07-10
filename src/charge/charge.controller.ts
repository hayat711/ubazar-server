import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { CurrentUser } from "../common/decorators";
import { User } from "../user/entities/user.entity";
import { StripeService } from "../stripe/stripe.service";
import CreateChargeDto from "./Dto/create-charge.dto";

@Controller('charge')
export class ChargeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCharge(@Body() charge: CreateChargeDto, @CurrentUser() user: User) {
    await this.stripeService.charge(charge.amount, charge.paymentMethodId, user.stripCustomerId);
  }
}
