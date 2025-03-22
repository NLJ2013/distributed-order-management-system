import { Inject, Injectable, Logger } from '@nestjs/common';
import { IOrder } from '@app/common/models/order.interface';
import { ProductService } from './modules/product/services/product/product.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  constructor(
    private readonly productService: ProductService,
    @Inject('SRV_INVENTORY') private readonly kafkaClient: ClientKafka,
  ) {}

  async checkAndReserveOrder(order: IOrder) {
    console.log('Order created from inventory service: ', order);
    console.log('Product ID:', order['productId'], order['_id']); // This is correct as is, the issue might be in the IOrder interface
    const product = await this.productService.getProductByProductId(
      order.productId,
    );
    console.log('Product:', product);
    if (!product) {
      this.kafkaClient.emit('inventory.not_found', {
        message: 'Product not found',
        productId: order.productId,
        status: 'NOT_FOUND',
        orderId: order._id,
      });
      this.logger.error(`Product not found: ${order.productId}`);
      return;
    }
    if (product.quantity < order.quantity) {
      this.kafkaClient.emit('inventory.out_of_stock', {
        message: 'Out of stock',
        productId: order.productId,
        status: 'OUT_OF_STOCK',
        orderId: order._id,
      });
      this.logger.error(`Insufficient stock: ${order.productId}`);
      return;
    }

    product.quantity -= order.quantity;
    await this.productService.updateProductQuantity(
      order.productId,
      product.quantity,
    );
    this.kafkaClient.emit('inventory.reserved', {
      message: 'Order reserved',
      productId: order.productId,
      status: 'RESERVED',
      orderId: order._id,
    });
  }
}
