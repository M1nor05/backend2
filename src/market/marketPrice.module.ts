import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { MarketPrice } from 'src/database/entities/marketPrice.entity';
import { MarketPriceController } from './marketPrice.controller';
import { MarketPriceService } from './marketPrice.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketPrice]), AuthModule],
  controllers: [MarketPriceController],
  providers: [MarketPriceService],
})
export class MarketPriceModule {}
