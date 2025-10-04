import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Plan } from './plan.entity';
import { User } from './user.entity';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  income: number; // umumiy daromad

  // Har bir budget -> 1 ta userga tegishli
  @ManyToOne(() => User, (user) => user.budgets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  // Budget ichida bir nechta planlar bo‘ladi
  @OneToMany(() => Plan, (plan) => plan.budget, { cascade: true })
  plans: Plan[];
}
