import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BusinessAnalysis } from './analiz.entity';
import { Budget } from './budget.entity'; // ✅ Budget import qilish

export type UserRole = 'admin' | 'user' | 'manager';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  businessType: string;

  @Column({ nullable: true })
  inn?: string;

  // ✅ tarif maydonlari
  @Column({ default: false })
  isActive: boolean;

  

  
@Column({ nullable: true })
tariffId: string; // qaysi tarif

@Column({ type: "timestamp", nullable: true })
tariffExpiresAt: Date; // amal qilish muddati



  @OneToMany(() => BusinessAnalysis, (analysis) => analysis.user)
  analysis: BusinessAnalysis[];

  // ✅ Budget bilan bog‘lanish
  @OneToMany(() => Budget, (budget) => budget.user)
  budgets: Budget[];

 // user.entity.ts ichida

}
