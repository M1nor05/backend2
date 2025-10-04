import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BusinessAnalysis } from 'src/database/entities/analiz.entity';
import { BusinessAnalysisController } from './analiz.controller';
import { BusinessAnalysisService } from './analiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessAnalysis]), AuthModule], // AuthModule ni import qildik
  controllers: [BusinessAnalysisController],
  providers: [BusinessAnalysisService],
})
export class BusinessAnalysisModule {}
