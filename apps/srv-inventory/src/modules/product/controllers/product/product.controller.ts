import { Controller } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from '@app/common/dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product.created')
  async createProduct(@Payload() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @MessagePattern('product.deleted')
  async deleteProduct(@Payload() _id: string) {
    return this.productService.deleteProduct(_id);
  }
}
