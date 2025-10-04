import { AdminRole } from 'src/common/enum/admin.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';



@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

// admin.entity.ts ichida






  @Column({
    type: 'enum',
    enum: AdminRole,
  })
  role: AdminRole;

  @CreateDateColumn()
  createdAt: Date;
}
