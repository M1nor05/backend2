import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MarketPriceService } from './marketPrice.service';
import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { CreateMarketPriceDto } from './dto/marcetPrice-create.dto';
import { UpdateMarketPriceDto } from './dto/marketPrice-update.dto';


@Controller('market-prices')
export class MarketPriceController {
  constructor(private readonly marketService: MarketPriceService) {}

  // Foydalanuvchi faqat GET ishlatadi
  @Get()
  findAll(@Query('businessType') businessType?: string) {
    return this.marketService.findAll(businessType);
  }

  // Admin: create
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateMarketPriceDto) {
    return this.marketService.create(dto);
  }

  // Admin: update
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMarketPriceDto) {
    return this.marketService.update(id, dto);
  }

  // Admin: remove
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketService.remove(id);
  }
}
