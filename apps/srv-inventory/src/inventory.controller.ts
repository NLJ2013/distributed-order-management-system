import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IOrder } from '@app/common/models/order.interface';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('order.created.updated')
  async handleOrderCreated(@Payload() data: IOrder) {
    await this.inventoryService.checkAndReserveOrder(data);
  }
}
