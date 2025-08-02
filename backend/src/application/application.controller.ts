import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto, @GetUser('userId') userId: string) {
    return this.applicationService.create(dto, userId);
  }
  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.applicationService.getUserApplications(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.applicationService.getApplicationById(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto, @GetUser('userId') userId: string) {
    return this.applicationService.updateApplication(id, dto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.applicationService.deleteApplication(id, userId);
  }

  @Get('/job/:jobId')
  @Roles('ADMIN')
  getApplicationsByJobId(@Param('jobId') jobId: string) {
    return this.applicationService.getApplicationsByJobId(jobId);
  }
}
