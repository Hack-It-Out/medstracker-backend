import { Test, TestingModule } from '@nestjs/testing';
import { AfricastalkingService } from './africastalking.service';

describe('AfricastalkingService', () => {
  let service: AfricastalkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfricastalkingService],
    }).compile();

    service = module.get<AfricastalkingService>(AfricastalkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
