import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from '../../services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  createOrder(@Body() orderDto: { productId: string; quantity: number }) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get('/test')
  getOrders() {
    console.log('getOrders');
  }
}
