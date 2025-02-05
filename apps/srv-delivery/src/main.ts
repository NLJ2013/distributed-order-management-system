import { NestFactory } from '@nestjs/core';

import { DeliveryModule } from './delivery.module';
import { Transport } from '@nestjs/microservices';

const app = await NestFactory.createMicroservice(DeliveryModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'delivery',
      brokers: ['localhost:9092'],
    },
  },
});

app.listen();
