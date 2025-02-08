import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

const app = await NestFactory.createMicroservice(OrdersModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'orders-consumer',
    },
  },
});

app.listen();
