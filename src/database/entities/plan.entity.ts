import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Budget } from './budget.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ nullable: true })
  description?: string;

  // Har bir plan -> bitta budgetga tegishli
  @ManyToOne(() => Budget, (budget) => budget.plans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'budgetId' })
  budget: Budget;

  @Column()
  budgetId: string;
}
