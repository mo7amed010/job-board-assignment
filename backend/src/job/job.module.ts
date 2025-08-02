import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobController } from './job.controller';

@Module({
  providers:[JobService],
  controllers:[JobController],
  imports:[PrismaModule]
})
export class JobModule {
}
