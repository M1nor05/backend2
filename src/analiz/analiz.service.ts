import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessAnalysis } from 'src/database/entities/analiz.entity';
import { Repository } from 'typeorm';
import { CreateBusinessAnalysisDto } from './dto/createanaliz.dto';
import { UpdateBusinessAnalysisDto } from './dto/update-analiz.dto';


@Injectable()
export class BusinessAnalysisService {
  constructor(
    @InjectRepository(BusinessAnalysis)
    private readonly analysisRepo: Repository<BusinessAnalysis>,
  ) {}

  async create(dto: CreateBusinessAnalysisDto, userId: string) {
    const analysis = this.analysisRepo.create({
      ...dto,
      user: { id: userId }, // token'dan kelgan user id
    });
    return await this.analysisRepo.save(analysis);
  }

  async findAllByUser(userId: string) {
    return await this.analysisRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const analysis = await this.analysisRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!analysis) throw new NotFoundException('Analiz topilmadi');
    return analysis;
  }

  async update(id: string, dto: UpdateBusinessAnalysisDto, userId: string) {
    const analysis = await this.findOne(id, userId);
    Object.assign(analysis, dto);
    return await this.analysisRepo.save(analysis);
  }

  async remove(id: string, userId: string) {
    const analysis = await this.findOne(id, userId);
    return await this.analysisRepo.remove(analysis);
  }
}
