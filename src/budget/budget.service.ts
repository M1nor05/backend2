import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/database/entities/budget.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create.dto';
import { UpdateBudgetDto } from './dto/update.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private readonly budgetRepo: Repository<Budget>,
  ) {}

 async create(userId: string, dto: CreateBudgetDto) {
  const budget = this.budgetRepo.create({
    ...dto,
    user: { id: userId }, 
  });
  return this.budgetRepo.save(budget);
}


  async findAll(userId: string) {
    return this.budgetRepo.find({
      where: { userId },
      relations: ['plans'], // planslarni ham olib keladi
    });
  }

  async update(userId: string, id: string, dto: UpdateBudgetDto) {
    const budget = await this.budgetRepo.findOne({ where: { id, userId } });
    if (!budget) throw new NotFoundException('Budget not found');

    Object.assign(budget, dto);
    return this.budgetRepo.save(budget);
  }

  async remove(userId: string, id: string) {
    const budget = await this.budgetRepo.findOne({ where: { id, userId } });
    if (!budget) throw new NotFoundException('Budget not found');

    return this.budgetRepo.remove(budget);
  }
}
