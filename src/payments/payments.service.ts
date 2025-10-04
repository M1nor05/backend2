import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/database/entities/payment.entity';
import { Tariff } from 'src/database/entities/tariff.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Tariff)
    private tariffRepo: Repository<Tariff>,
  ) {}

  async createPayment(userId: string, tariffId: string, provider: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const tariff = await this.tariffRepo.findOne({ where: { id: tariffId } });

    if (!user || !tariff) throw new Error('User yoki tariff topilmadi');

    const payment = this.paymentRepo.create({
      user,
      tariff,
      status: 'pending',
      provider,
      amount: tariff.price,
    });

    return this.paymentRepo.save(payment);
  }

  async updatePaymentStatus(transactionId: string, status: 'success' | 'failed') {
    const payment = await this.paymentRepo.findOne({ where: { transactionId } });
    if (!payment) throw new Error('Payment topilmadi');

    payment.status = status;
    return this.paymentRepo.save(payment);
  }
}
