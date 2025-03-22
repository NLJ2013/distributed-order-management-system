import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from '@app/common/dto/create-product.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('SRV_INVENTORY') private readonly kafkaClient: ClientKafka,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const foundProduct = await this.productModel
        .findOne({ productId: createProductDto.productId })
        .lean();
      if (foundProduct) {
        this.kafkaClient.emit('product.create.duplicate', {
          message: 'Product already exists',
          productId: createProductDto.productId,
        });
        this.logger.error(
          `Product did not create: Product already exists: ${createProductDto.productId}`,
        );
        return foundProduct;
      }
      const product = new this.productModel(createProductDto);
      return await this.productModel.create(product);
    } catch (error) {
      // Handle unexpected errors normally
      this.kafkaClient.emit('product.create.failed', {
        message: error instanceof Error ? error.message : error,
        productId: createProductDto.productId,
      });
      throw new InternalServerErrorException(error);
    }
  }

  async getProducts() {
    return this.productModel.find();
  }

  async getProductById(id: string) {
    return this.productModel.findById(id);
  }

  async getProductByProductId(productId: string) {
    return this.productModel.findOne({ productId }).lean();
  }

  async updateProductQuantity(productId: string, quantity: number) {
    return this.productModel.findOneAndUpdate(
      { productId },
      { $inc: { quantity } },
    );
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
