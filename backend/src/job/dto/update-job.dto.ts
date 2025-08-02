import { PartialType } from '@nestjs/mapped-types';
// update-job.dto.ts
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {}
