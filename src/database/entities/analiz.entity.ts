import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('business_analysis')
export class BusinessAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string; // Oy (1-12)

  @Column()
  businessType: string; // Savdo, Ishlab chiqarish, Xizmat

  @Column('jsonb')
  data: Record<string, any>; // Har xil qiymatlar keladi

  @ManyToOne(() => User, (user) => user.analysis, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
