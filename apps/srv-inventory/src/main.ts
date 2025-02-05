import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { Transport } from '@nestjs/microservices';

const app = await NestFactory.createMicroservice(InventoryModule, {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'inventory',
      brokers: ['localhost:9092'],
    },
  },
});

app.listen();
