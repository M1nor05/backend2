import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CRMRequest } from "src/database/entities/crm.entity";
import { Repository } from "typeorm";
import { CreateCRMRequestDto } from "./dto/create-crm.dto";
import { UpdateCRMRequestDto } from "./dto/update-crm.dto";


@Injectable()
export class CRMRequestService {
  constructor(
    @InjectRepository(CRMRequest)
    private crmRepository: Repository<CRMRequest>
  ) {}

  async create(dto: CreateCRMRequestDto): Promise<CRMRequest> {
    const newRequest = this.crmRepository.create(dto);
    return this.crmRepository.save(newRequest);
  }

  async findAll(): Promise<CRMRequest[]> {
    return this.crmRepository.find();
  }

  async findOne(id: string): Promise<CRMRequest> {
    const req = await this.crmRepository.findOne({ where: { id } });
    if (!req) throw new NotFoundException("CRM so‘rov topilmadi");
    return req;
  }

  async update(id: string, dto: UpdateCRMRequestDto): Promise<CRMRequest> {
    await this.findOne(id);
    await this.crmRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const req = await this.findOne(id);
    await this.crmRepository.remove(req);
  }
}
