import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('market_prices')
export class MarketPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  businessType: string; // Savdo, Xizmat, Ishlab chiqarish

  @Column()
  name: string; // Mahsulot yoki xizmat nomi

  @Column('float')
  price: number; // Bozordagi narx

  @CreateDateColumn()
  createdAt: Date;
}
