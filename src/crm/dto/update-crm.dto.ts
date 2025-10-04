import { PartialType } from "@nestjs/mapped-types";
import { CreateCRMRequestDto } from "./create-crm.dto";


export class UpdateCRMRequestDto extends PartialType(CreateCRMRequestDto) {}
