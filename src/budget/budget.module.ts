import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from 'src/database/entities/budget.entity';
import { Plan } from 'src/database/entities/plan.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Plan])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
