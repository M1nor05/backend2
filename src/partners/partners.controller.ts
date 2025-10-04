import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { PartnerService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partners.dto';
import { UpdatePartnerDto } from './dto/update-partners.dto';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreatePartnerDto) {
    return this.partnerService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.partnerService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.partnerService.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.partnerService.remove(req.user.id, id);
  }
}
