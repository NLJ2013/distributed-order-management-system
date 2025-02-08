import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() data: any) {
    await this.ordersService.processOrder(data);
  }
}
