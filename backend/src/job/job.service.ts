import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

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

  async getAllJobs() {
    return this.prisma.job.findMany({
      include: {
        createdBy: {
        select: {
          fullName: true, 
        },
      },
  }});
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
