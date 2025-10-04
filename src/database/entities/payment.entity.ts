import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Tariff } from './tariff.entity';

export type PaymentStatus = 'pending' | 'success' | 'failed';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Tariff, (tariff) => tariff.id)
  tariff: Tariff;

  @Column({ default: 'pending' })
  status: PaymentStatus;

  @Column({ nullable: true })
  provider: string; // payme yoki click

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
