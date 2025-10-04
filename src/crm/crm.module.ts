import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CRMRequest } from "src/database/entities/crm.entity";
import { CRMRequestController } from "./crm.controller";
import { CRMRequestService } from "./crm.service";


@Module({
  imports: [TypeOrmModule.forFeature([CRMRequest])],
  controllers: [CRMRequestController],
  providers: [CRMRequestService],
})
export class CRMRequestModule {}
