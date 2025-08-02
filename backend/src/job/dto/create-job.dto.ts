import { IsString, IsNumber, IsEnum } from 'class-validator';
import { JobStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsNumber()
  @ApiProperty()
  salary: number;

  @IsEnum(JobStatus)
  @ApiProperty({ enum: JobStatus, default: JobStatus.OPEN })
  status: JobStatus;
}