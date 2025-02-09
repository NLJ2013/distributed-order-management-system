import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductController } from './controllers/product/product.controller';
import { ProductService } from './services/product/product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SRV_INVENTORY',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['localhost:9092'] },
          consumer: { groupId: 'inventory-consumer' },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
