import { Module } from '@nestjs/common';
import { SrvGatewayController } from './srv-gateway.controller';
import { SrvGatewayService } from './srv-gateway.service';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [SrvGatewayController],
  providers: [SrvGatewayService],
})
export class SrvGatewayModule {}
