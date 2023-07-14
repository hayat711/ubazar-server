import {forwardRef,  Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressController } from './shipping-address.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShippingAddress } from "./entities/shipping-address.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ShippingAddressController],
  providers: [ShippingAddressService],
  imports: [TypeOrmModule.forFeature([ShippingAddress]),
    forwardRef(() => AuthModule),
  ],
  exports: [ShippingAddressService],

})
export class ShippingAddressModule {}
