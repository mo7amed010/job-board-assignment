import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        applications: {
          select: {
            id: true,
            resumeText: true,
            coverLetter: true,
            status: true,
            jobId: true,
          },
        },
      },
    });
  }
}
