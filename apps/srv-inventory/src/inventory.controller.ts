import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('order.created')
  async handleOrderCreated(@Payload() data: any) {
    console.log('Order created:', data);
  }
}
