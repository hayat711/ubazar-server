import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { AuthModule } from "../auth/auth.module";
import { StripeModule } from "../stripe/stripe.module";

@Module({
  controllers: [ChargeController],
  imports: [AuthModule, StripeModule]
})
export class ChargeModule {}
