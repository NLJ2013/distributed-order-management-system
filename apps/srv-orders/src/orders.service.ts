import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from '@app/common/dto/create-order.dto';
import { IOrder } from '@app/common/models/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async processOrder(order: CreateOrderDto) {
    const newOrder = await this.orderModel.create(order);
    this.kafkaClient.emit('order.created.updated', newOrder);
    return newOrder;
  }

  async confirmOrder(order: IOrder) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(order._id, {
      status: 'CONFIRMED',
    });
    this.kafkaClient.emit('order.confirmed', updatedOrder);
    return updatedOrder;
  }

  async rejectOrder(order: IOrder) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(order._id, {
      status: 'REJECTED',
    });
    this.kafkaClient.emit('order.rejected', updatedOrder);
    return updatedOrder;
  }
}
