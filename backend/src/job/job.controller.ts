import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Jobs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new job (admin only)' })
  @ApiResponse({ status: 201, description: 'Job created successfully.' })
  create(@Body() dto: CreateJobDto, @GetUser('userId') userId: string) {
    console.log(userId);
    return this.jobService.createJob(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs (public)' })
  @ApiResponse({ status: 200, description: 'List of jobs.' })
  async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('location') location?: string,
  @Query('status') status?: string
) {
  return this.jobService.getAllJobs({ page: +page, limit: +limit, location, status });
}
  // findAll() {
  //   return this.jobService.getAllJobs();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific job by ID (public)' })
  @ApiResponse({ status: 200, description: 'Single job with details.' })
  findOne(@Param('id') id: string) {
    return this.jobService.getJobById(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a job (admin only)' })
  @ApiResponse({ status: 200, description: 'Job updated successfully.' })
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobService.updateJob(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a job (admin only)' })
  @ApiResponse({ status: 204, description: 'Job deleted successfully.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }
}
