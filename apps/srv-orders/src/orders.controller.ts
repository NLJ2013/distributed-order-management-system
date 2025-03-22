import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from '@app/common/dto/create-order.dto';
import { IOrder } from '@app/common/models/order.interface';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() data: CreateOrderDto) {
    await this.ordersService.processOrder(data);
  }

  @MessagePattern('inventory.reserved')
  async handleOrderUpdated(@Payload() order: IOrder) {
    await this.ordersService.confirmOrder(order);
  }

  @MessagePattern('inventory.out_of_stock')
  async handleOrderDeleted(@Payload() order: IOrder) {
    await this.ordersService.rejectOrder(order);
  }

  @MessagePattern('inventory.not_found')
  async handleOrderNotFound(@Payload() order: IOrder) {
    await this.ordersService.rejectOrder(order);
  }
}
