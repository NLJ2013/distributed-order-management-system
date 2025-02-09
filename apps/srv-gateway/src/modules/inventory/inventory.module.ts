import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'] },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class InventoryModule {}
