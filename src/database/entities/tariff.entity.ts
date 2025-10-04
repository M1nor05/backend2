import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tariffs')
export class Tariff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number; // so‘m yoki $

  @Column()
  durationDays: number; // necha kunga aktiv bo‘ladi
}
