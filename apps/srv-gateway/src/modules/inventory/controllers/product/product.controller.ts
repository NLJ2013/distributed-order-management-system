import { CreateProductDto } from '@app/common/dto/create-product.dto';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
