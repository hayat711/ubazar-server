import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { StripeModule } from "../stripe/stripe.module";

@Module({
  controllers: [CreditCardController],
  imports: [StripeModule],

})
export class CreditCardModule {}
