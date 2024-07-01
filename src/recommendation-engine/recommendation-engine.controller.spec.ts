import { Test, TestingModule } from '@nestjs/testing';
import { RecommendationEngineController } from './recommendation-engine.controller';

describe('RecommendationEngineController', () => {
  let controller: RecommendationEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationEngineController],
    }).compile();

    controller = module.get<RecommendationEngineController>(
      RecommendationEngineController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
