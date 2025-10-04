import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAnalysis } from 'src/database/entities/analiz.entity';
import { MarketIntelligenceService } from './market.service';
import { MarketIntelligenceController } from './market.controller';


@Module({
  imports: [TypeOrmModule.forFeature([BusinessAnalysis])],
  providers: [MarketIntelligenceService],
  controllers: [MarketIntelligenceController],
})
export class MarketIntelligenceModule {}
