import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from '../../services/orders/orders.service';
import { CreateOrderDto } from '@app/common/dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() orderDto: CreateOrderDto) {
    return this.ordersService.createOrder(orderDto);
  }

  @Get('/test')
  getOrders() {
    console.log('getOrders');
  }
}
