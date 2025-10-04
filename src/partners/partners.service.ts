import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/database/entities/parners.entity';
import { Repository } from 'typeorm';
import { CreatePartnerDto } from './dto/create-partners.dto';
import { UpdatePartnerDto } from './dto/update-partners.dto';


@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepo: Repository<Partner>,
  ) {}

  async create(userId: string, dto: CreatePartnerDto) {
    const partner = this.partnerRepo.create({ ...dto, userId });
    return this.partnerRepo.save(partner);
  }

  async findAll(userId: string) {
    // Barcha hamkorlarni olish, foydalanuvchi o‘zini tahrir qiladi
    return this.partnerRepo.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    const partner = await this.partnerRepo.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async update(userId: string, id: string, dto: UpdatePartnerDto) {
    const partner = await this.partnerRepo.findOne({ where: { id, userId } });
    if (!partner) throw new NotFoundException('Partner not found or not owned by user');
    Object.assign(partner, dto);
    return this.partnerRepo.save(partner);
  }

  async remove(userId: string, id: string) {
    const partner = await this.partnerRepo.findOne({ where: { id, userId } });
    if (!partner) throw new NotFoundException('Partner not found or not owned by user');
    return this.partnerRepo.remove(partner);
  }
}
