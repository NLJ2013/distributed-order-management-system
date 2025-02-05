import { Test, TestingModule } from '@nestjs/testing';
import { SrvDeliveryController } from './srv-delivery.controller';
import { SrvDeliveryService } from './srv-delivery.service';

describe('SrvDeliveryController', () => {
  let srvDeliveryController: SrvDeliveryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SrvDeliveryController],
      providers: [SrvDeliveryService],
    }).compile();

    srvDeliveryController = app.get<SrvDeliveryController>(SrvDeliveryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(srvDeliveryController.getHello()).toBe('Hello World!');
    });
  });
});
