import { Controller, Get } from '@nestjs/common';
import { SrvGatewayService } from './srv-gateway.service';

@Controller()
export class SrvGatewayController {
  constructor(private readonly srvGatewayService: SrvGatewayService) {}

  @Get()
  getHello(): string {
    return this.srvGatewayService.getHello();
  }
}
