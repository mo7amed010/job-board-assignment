import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @Roles('JOBSEEKER')
  @ApiOperation({ summary: 'Submit a new application (user only)' })
  @ApiResponse({ status: 201, description: 'Application submitted.' })
  create(@Body() dto: CreateApplicationDto, @GetUser('userId') userId: string) {
    return this.applicationService.create(dto, userId);
  }
  @Get()
  @ApiOperation({ summary: 'Get all application for the current user' })
  @ApiResponse({ status: 200, description: 'List of all applications for the current user.' })
  findAll(@GetUser('userId') userId: string) {
    return this.applicationService.getUserApplications(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID for the current user' })
  @ApiResponse({ status: 200, description: 'Single application with details.' })
  findOne(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.applicationService.getApplicationById(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update application for the current user' })
  @ApiResponse({ status: 200, description: 'Application updated successfully.' })
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto, @GetUser('userId') userId: string) {
    return this.applicationService.updateApplication(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application for the current user' })
  @ApiResponse({ status: 204, description: 'Application deleted successfully.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.applicationService.deleteApplication(id, userId);
  }

  @Get('/job/:jobId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all applications for a specific job (admin only)' })
  @ApiResponse({ status: 200, description: 'List of applications for a specific job.' })
  getApplicationsByJobId(@Param('jobId') jobId: string) {
    return this.applicationService.getApplicationsByJobId(jobId);
  }
}
