import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { CurrentUser } from "../common/decorators";

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto, @CurrentUser('id') userId: string) {
    return this.shippingAddressService.create(createShippingAddressDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.shippingAddressService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingAddressService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
  //   return this.shippingAddressService.update(+id, updateShippingAddressDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shippingAddressService.remove(+id);
  // }
}
