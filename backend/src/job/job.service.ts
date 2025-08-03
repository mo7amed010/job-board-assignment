import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobStatus, Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(dto: CreateJobDto, userId: string) {
    return this.prisma.job.create({
      data: {
        ...dto,
        createdById: userId,
      },
    });
  }

  // async getAllJobs() {
  //   return this.prisma.job.findMany({
  //     include: {
  //       createdBy: {
  //       select: {
  //         fullName: true, 
  //       },
  //     },
  // }});
  // }

  // jobs.service.ts

async getAllJobs(params: {
  page?: number;
  limit?: number;
  location?: string;
  status?: string;
}) {
  const { page = 1, limit = 10, location, status } = params;

  const filters: any = {};

  if (location) filters.location = { contains: location, mode: 'insensitive' };
  if (status) filters.status = status;

  return this.prisma.job.findMany({
    where: filters,
    include: {
      createdBy: {
        select: {
          fullName: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}



  async getJobById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: {
        createdBy: {
        select: {
          fullName: true, 
        },
      },
    }});
  }

  async updateJob(id: string, dto: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data: dto,
    });
  }

  async deleteJob(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
