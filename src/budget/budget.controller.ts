import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create.dto';
import { UpdateBudgetDto } from './dto/update.dto';
import { JwtAuthGuard } from 'src/common/guards/authGuard';


@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  // Har bir route JWT token bilan himoyalanadi
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBudgetDto, @Req() req: any) {
    console.log('REQ USER:', req.user); // debug uchun
    return this.budgetService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    return this.budgetService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto, @Req() req: any) {
    return this.budgetService.update(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.budgetService.remove(req.user.id, id);
  }
}
