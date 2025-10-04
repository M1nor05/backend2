import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { MarketIntelligenceService } from './market.service';
;

@UseGuards(JwtAuthGuard)
@Controller('market-intelligence')
export class MarketIntelligenceController {
  constructor(
    private readonly marketIntelligenceService: MarketIntelligenceService,
  ) {}

  @Get()
  async getIntelligence(@Req() req: any) {
    const userId = req.user.id;
    const businessType = req.user.businessType;
   
    return this.marketIntelligenceService.getIntelligenceByType(
      userId,
      businessType,
    );
  }
}
