import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  resumeText: string;

  @IsString()
  @IsNotEmpty()
  coverLetter: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @IsUUID()
  jobId: string;
}
