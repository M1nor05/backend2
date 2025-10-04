import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GuidesService } from './guides.service';

import { JwtAuthGuard } from 'src/common/guards/authGuard';
import { CreateGuideDto } from './dto/create.dto';
import { UpdateGuideDto } from './dto/update.dto';


@Controller('guides')
export class GuidesController {
  constructor(private readonly guidesService: GuidesService) {}


  
  @Post()
  create(@Body() dto: CreateGuideDto) {
    return this.guidesService.create(dto);
  }

  @Get()
  findAll() {
    return this.guidesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGuideDto) {
    return this.guidesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidesService.remove(id);
  }
}
