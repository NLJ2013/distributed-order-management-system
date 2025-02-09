import { CreateProductDto } from '@app/common/dto/create-product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @Inject('INVENTORY_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async createProduct(data: CreateProductDto) {
    this.kafkaClient.emit('product.created', data);
    return {
      message: 'Product created successfully',
      correlationId: uuidv4(),
    };
  }

  async deleteProduct(_id: string) {
    this.kafkaClient.emit('product.deleted', _id);
    return {
      message: 'Product deleted successfully',
      correlationId: uuidv4(),
    };
  }
}
