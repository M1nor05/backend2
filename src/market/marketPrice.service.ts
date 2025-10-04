import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketPrice } from 'src/database/entities/marketPrice.entity';
import { Repository } from 'typeorm';
import { CreateMarketPriceDto } from './dto/marcetPrice-create.dto';
import { UpdateMarketPriceDto } from './dto/marketPrice-update.dto';


@Injectable()
export class MarketPriceService {
  constructor(
    @InjectRepository(MarketPrice)
    private readonly marketRepo: Repository<MarketPrice>,
  ) {}

  async create(dto: CreateMarketPriceDto) {
    const price = this.marketRepo.create(dto);
    return this.marketRepo.save(price);
  }

  async findAll(businessType?: string) {
    if (businessType) {
      return this.marketRepo.find({ where: { businessType } });
    }
    return this.marketRepo.find();
  }

  async update(id: string, dto: UpdateMarketPriceDto) {
    const price = await this.marketRepo.findOne({ where: { id } });
    if (!price) throw new NotFoundException('Market price not found');
    Object.assign(price, dto);
    return this.marketRepo.save(price);
  }

  async remove(id: string) {
    const price = await this.marketRepo.findOne({ where: { id } });
    if (!price) throw new NotFoundException('Market price not found');
    return this.marketRepo.remove(price);
  }
}
