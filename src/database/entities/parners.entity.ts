import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string; // foydalanuvchi ismi

  @Column()
  businessName: string; // biznes nomi

  @Column()
  productName: string; // sotmoqchi mahsulot

  @Column('float')
  quantity: number; // hajmi

  @Column('float')
  price: number; // narxi

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telegram?: string;

  @Column({ nullable: true })
  phone?: string;
}
