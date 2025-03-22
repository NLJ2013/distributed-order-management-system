import { CreateOrderDto } from '@app/common/dto/create-order.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async createOrder(orderDto: CreateOrderDto) {
    this.kafkaClient.emit('order.created', orderDto);
    return {
      message: 'Order Placement Initiated',
      correlationId: uuidv4(),
    };
  }
}
