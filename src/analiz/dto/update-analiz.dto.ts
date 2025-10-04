import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessAnalysisDto } from './createanaliz.dto';


export class UpdateBusinessAnalysisDto extends PartialType(CreateBusinessAnalysisDto) {}
