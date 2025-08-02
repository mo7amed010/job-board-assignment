import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService,PrismaService],
  imports: [],
})
export class ApplicationModule {}
