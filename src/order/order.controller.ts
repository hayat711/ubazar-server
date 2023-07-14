import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from "@nestjs/common";
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser } from "../common/decorators";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { PaymentStatus } from "../common/enums/payment.enum";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body() createOrderDto: CreateOrderDto,
         @CurrentUser('id') userId: string) {

    return this.orderService.createOrder(userId, createOrderDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request, @CurrentUser('id') userId: string) {
    console.log('the USER ID ', userId);
    return this.orderService.getOrders(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/payment-status')
  async updatePaymentStatus(
    @Param('orderId') orderId: string,
    @Body('paymentStatus') paymentStatus: PaymentStatus
  ) {
    console.log('it is the route to updat order stastus')
    await this.orderService.updatePaymentStatus(orderId, paymentStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }
}
