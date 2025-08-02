import { IsString, IsNumber, IsEnum } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsNumber()
  salary: number;

  @IsEnum(JobStatus)
  status: JobStatus;
}