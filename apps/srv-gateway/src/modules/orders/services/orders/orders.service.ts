import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  async createOrder(orderDto: { productId: string; quantity: number }) {
    this.kafkaClient.emit('order.created', orderDto);
    return {
      message: 'Order placed successfully',
      orderId: orderDto.productId,
    };
  }
}
