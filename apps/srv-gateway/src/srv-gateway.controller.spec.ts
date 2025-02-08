import { Test, TestingModule } from '@nestjs/testing';
import { SrvGatewayController } from './srv-gateway.controller';
import { SrvGatewayService } from './srv-gateway.service';

describe('SrvGatewayController', () => {
  let srvGatewayController: SrvGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SrvGatewayController],
      providers: [SrvGatewayService],
    }).compile();

    srvGatewayController = app.get<SrvGatewayController>(SrvGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(srvGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
