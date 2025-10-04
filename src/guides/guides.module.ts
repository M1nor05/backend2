import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from 'src/database/entities/guides.entity';
import { GuidesService } from './guides.service';
import { GuidesController } from './guides.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Guide])],
  controllers: [GuidesController],
  providers: [GuidesService],
})
export class GuidesModule {}
