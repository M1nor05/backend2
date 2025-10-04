import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { BusinessAnalysisService } from './analiz.service';
import { CreateBusinessAnalysisDto } from './dto/createanaliz.dto';
import { UpdateBusinessAnalysisDto } from './dto/update-analiz.dto';

@Controller('business-analysis')
@UseGuards(JwtAuthGuard)
export class BusinessAnalysisController {
  constructor(private readonly analysisService: BusinessAnalysisService) {}

  @Post()
  create(@Body() dto: CreateBusinessAnalysisDto, @Req() req) {
    return this.analysisService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.analysisService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.analysisService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessAnalysisDto,
    @Req() req,
  ) {
    return this.analysisService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.analysisService.remove(id, req.user.id);
  }
}
