import { Test, TestingModule } from '@nestjs/testing';
import { SrvInventoryController } from './srv-inventory.controller';
import { SrvInventoryService } from './srv-inventory.service';

describe('SrvInventoryController', () => {
  let srvInventoryController: SrvInventoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SrvInventoryController],
      providers: [SrvInventoryService],
    }).compile();

    srvInventoryController = app.get<SrvInventoryController>(SrvInventoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(srvInventoryController.getHello()).toBe('Hello World!');
    });
  });
});
