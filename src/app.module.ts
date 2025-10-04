import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './adminAuth/admins.module';
import { BusinessAnalysisModule } from './analiz/analiz.module';
import { BudgetModule } from './budget/budget.module';
import { MarketIntelligenceModule } from './market/market.module';
import { MarketPriceModule } from './market/marketPrice.module';
import { PartnerModule } from './partners/partners.module';

import { GuidesModule } from './guides/guides.module';

import { CRMRequestModule } from './crm/crm.module';
import { UserModule } from './users/users.module';
import { UsersModule } from './profil/profil.module';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, 
     load: [databaseConfig], 
    }),
   TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('database.host'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.username'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.database'),
    autoLoadEntities: true,
    synchronize: true,  // local test uchun true
  }),
})
,AuthModule,AdminAuthModule,BusinessAnalysisModule,BudgetModule,MarketIntelligenceModule,MarketPriceModule,PartnerModule,GuidesModule,UserModule,CRMRequestModule,UsersModule],
  controllers: [],
  providers: [],
})
  
  
export class AppModule {}
