import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateApplicationDto, userId: string) {
    const existing = await this.prisma.application.findFirst({
      where: {
        userId,
        jobId: dto.jobId,
      },
    });

    if (existing) {
      throw new ForbiddenException('You already applied to this job');
    }

    return this.prisma.application.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

async getUserApplications(userId: string) {
  return this.prisma.application.findMany({
    where: { userId },
    include: {
      job: true, 
    },
  });
}


  async getApplicationById(id: string, userId: string) {
    const application = await this.validateOwnershipOrThrow(id, userId);
    return application;
  }


  async updateApplication(id: string, dto: UpdateApplicationDto, userId: string) {
    const application =  await this.validateOwnershipOrThrow(id, userId);

    return this.prisma.application.update({
      where: { id },
      data: dto,
    });
  }


  async deleteApplication(id: string, userId: string) {
    const application = await this.validateOwnershipOrThrow(id, userId);

    return this.prisma.application.delete({
      where: { id },
    });
  }

    async getApplicationsByJobId(jobId: string) {
    return this.prisma.application.findMany({
      where: {
        jobId,
      },
      select: {
        id: true,
        resumeText: true,
        coverLetter: true,
        status: true,
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });
  }

  private async validateOwnershipOrThrow(applicationId: string, userId: string) {
  const application = await this.prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new NotFoundException('Application not found');
  }

  if (application.userId !== userId) {
    throw new ForbiddenException('You do not have access to this application');
  }

  return application;
}

}
