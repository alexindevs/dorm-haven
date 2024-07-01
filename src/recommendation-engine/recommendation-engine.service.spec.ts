import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationEngineService } from './recommendation-engine.service';

describe('RecommendationEngineService', () => {
  let service: RecommendationEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommendationEngineService],
    }).compile();

    service = module.get<RecommendationEngineService>(
      RecommendationEngineService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
