import { Module } from '@nestjs/common';
import { SrvGatewayController } from './srv-gateway.controller';
import { SrvGatewayService } from './srv-gateway.service';
import { OrdersModule } from './modules/orders/orders.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [OrdersModule, InventoryModule],
  controllers: [SrvGatewayController],
  providers: [SrvGatewayService],
})
export class SrvGatewayModule {}
