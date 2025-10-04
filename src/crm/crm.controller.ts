import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { CRMRequestService } from "./crm.service";
import { CreateCRMRequestDto } from "./dto/create-crm.dto";
import { UpdateCRMRequestDto } from "./dto/update-crm.dto";


@Controller("crm-requests")
export class CRMRequestController {
  constructor(private readonly crmService: CRMRequestService) {}

  @Post()
  create(@Body() dto: CreateCRMRequestDto) {
    return this.crmService.create(dto);
  }

  @Get()
  findAll() {
    return this.crmService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.crmService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCRMRequestDto) {
    return this.crmService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.crmService.remove(id);
  }
}
