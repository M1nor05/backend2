import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessAnalysis } from 'src/database/entities/analiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarketIntelligenceService {
  constructor(
    @InjectRepository(BusinessAnalysis)
    private readonly analysisRepo: Repository<BusinessAnalysis>,
  ) {}

  private metricsByType: Record<string, string[]> = {
    savdo: ['Daromad', 'Xarajat', 'Foyda', 'Mijozlar', 'Takroriy mijozlar'],
    ishlab_chiqarish: [
      'Ishlab chiqarish hajmi',
      'Sotilgan birliklar',
      'Ishlash quvvati (%)',
      'Nuqsonlar foizi',
      'Xodimlar soni',
    ],
    xizmat: [
      'Xizmat buyurtmalari',
      'Xizmat vaqti (min)',
      'Mijozlar',
      'Mijoz qoniqishi',
      'Xodimlar soni',
    ],
  };

  // Normalizatsiya — keladigan type ni DB va metricsByType formatiga o‘tkazib beradi
  private normalizeType(raw?: string): string | null {
    if (!raw) return null;
    const lower = raw.trim().toLowerCase();

    if (lower === 'savdo') return 'savdo';
    if (lower === 'ishlab chiqarish' || lower === 'ishlabchiqarish')
      return 'ishlab_chiqarish';
    if (lower === 'xizmat') return 'xizmat';

    return null;
  }

  async getIntelligenceByType(userId: string, businessType?: string) {
    const type = this.normalizeType(businessType);
    console.log('Requested type:', businessType, '→ normalized:', type);

    if (!type || !this.metricsByType[type]) {
      return {
        usersCount: 0,
        myData: {},
        averageData: {},
        metrics: [],
        error: 'Invalid or missing businessType',
      };
    }

    // faqat shu type bo‘yicha so‘rov
    const analyses = await this.analysisRepo
      .createQueryBuilder('ba')
      .leftJoinAndSelect('ba.user', 'user')
      .where('LOWER(ba.businessType) = :type', { type })
      .orderBy('ba.createdAt', 'DESC')
      .getMany();

    if (!analyses.length) {
      return { usersCount: 0, myData: {}, averageData: {}, metrics: [] };
    }

    // har bir user bo‘yicha faqat eng so‘nggi yozuvni olish
    const latestByUser: Record<string, Record<string, any>> = {};
    analyses.forEach((a) => {
      const uid = a.user?.id ?? a.id;
      if (!latestByUser[uid]) latestByUser[uid] = a.data;
    });

    // Mening ma’lumotim
    const myData = latestByUser[userId] ?? {};

    // Boshqalar (shu type ichida)
    const others = Object.entries(latestByUser)
      .filter(([id]) => id !== userId)
      .map(([_, data]) => data);

    const metrics = this.metricsByType[type];
    const averageData: Record<string, number> = {};

    // o‘rtacha hisob
    metrics.forEach((metric) => {
      let sum = 0;
      let count = 0;
      others.forEach((userData) => {
        const val = userData?.[metric];
        const numVal = typeof val === 'number' ? val : parseFloat(String(val));
        if (!isNaN(numVal)) {
          sum += numVal;
          count++;
        }
      });
      averageData[metric] = count ? sum / count : 0;
    });

    // farqlarni hisoblash
    const resultMetrics = metrics.map((metric) => {
      const myValue = myData?.[metric] ?? 0;
      const marketValue = averageData[metric] ?? 0;
      const diffAmount = myValue - marketValue;
      const diffPercent = marketValue
        ? ((myValue - marketValue) / marketValue) * 100
        : 0;
      return { metric, myValue, marketValue, diffAmount, diffPercent };
    });

    return {
      // usersCount: Object.keys(latestByUser).length,
      // myData,
      // averageData,
      metrics: resultMetrics,
    }
  }
}
