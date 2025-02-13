import { Injectable } from '@nestjs/common';
import Stripe from 'stripe'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }


  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email
    });
  }

  public async attachCreditCard(paymentMethod:string, customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethod
    });
  }

  public async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      off_session: true,
      confirm: true,
    });
  }

  public async listCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }

}
