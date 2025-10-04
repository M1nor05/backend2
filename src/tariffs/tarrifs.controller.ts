import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { TariffService } from "./tarrifs.service";


@Controller("tariffs")
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Get()
  getAll() {
    return this.tariffService.getAll();
  }

  @Post()
  create(@Body() dto: any) {
    return this.tariffService.create(dto);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.tariffService.getOne(id);
  }
}
