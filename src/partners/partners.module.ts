import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerService } from './partners.service';
import { Partner } from 'src/database/entities/parners.entity';
import { PartnerController } from './partners.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnerService],
  controllers: [PartnerController],
})
export class PartnerModule {}
