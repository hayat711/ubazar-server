import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Product } from "./product/entities/product.entity";
import { Category } from "./category/entities/category.entity";
import { BagModule } from './bag/bag.module';
import { WishListModule } from './wish-list/wish-list.module';
import { OrderModule } from './order/order.module';
import { ShippingAddressModule } from './shipping-address/shipping-address.module';
import { BagProductModule } from './bag-product/bag-product.module';
import { WishlistItemModule } from './wishlist-item/wishlist-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { Order } from "./order/entities/order.entity";
import { DatabaseModule } from "./database/database.module";
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { StripeModule } from './stripe/stripe.module';
import { ChargeModule } from './charge/charge.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { EmailModule } from "./email/email.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule,
    UserModule,
    DatabaseModule,
    ProductModule,
    CategoryModule,
    BagModule,
    WishListModule,
    OrderModule,
    ShippingAddressModule,
    BagProductModule,
    WishlistItemModule,
    OrderItemModule,
    PaymentModule,
    ReviewModule,
    StripeModule,
    ChargeModule,
    CreditCardModule,
    EmailModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
