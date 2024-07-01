import { Module } from '@nestjs/common';
import { RecommendationEngineService } from './recommendation-engine.service';
import { RecommendationEngineController } from './recommendation-engine.controller';

@Module({
  providers: [RecommendationEngineService],
  controllers: [RecommendationEngineController],
})
export class RecommendationEngineModule {}
