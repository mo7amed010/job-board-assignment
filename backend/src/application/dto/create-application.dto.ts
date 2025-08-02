import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  coverLetter: string;

  @IsEnum(ApplicationStatus)

  @ApiProperty({ enum: ApplicationStatus, default: ApplicationStatus.SUBMITTED })
  status: ApplicationStatus;

  @IsUUID()
  @ApiProperty()
  jobId: string;
}
