import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from 'src/database/entities/guides.entity';
import { CreateGuideDto } from './dto/create.dto';
import { UpdateGuideDto } from './dto/update.dto';


@Injectable()
export class GuidesService {
  constructor(@InjectRepository(Guide) private readonly guideRepo: Repository<Guide>) {}

  async create(dto: CreateGuideDto) {
    const guide = this.guideRepo.create(dto);
    return this.guideRepo.save(guide);
  }

  async findAll() {
    return this.guideRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const guide = await this.guideRepo.findOne({ where: { id } });
    if (!guide) throw new NotFoundException('Guide not found');
    return guide;
  }

  async update(id: string, dto: UpdateGuideDto) {
    const guide = await this.findOne(id);
    Object.assign(guide, dto);
    return this.guideRepo.save(guide);
  }

  async remove(id: string) {
    const guide = await this.findOne(id);
    return this.guideRepo.remove(guide);
  }
}
