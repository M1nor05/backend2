import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tariff } from "src/database/entities/tariff.entity";
import { Repository } from "typeorm";
;

@Injectable()
export class TariffService {
  constructor(
    @InjectRepository(Tariff) private repo: Repository<Tariff>
  ) {}

  getAll() {
    return this.repo.find();
  }

  getOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: any) {
    const tariff = this.repo.create(dto);
    return this.repo.save(tariff);
  }
}
