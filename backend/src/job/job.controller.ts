import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { GetUser } from "src/common/decorators/get-user.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() dto: CreateJobDto, @GetUser('userId') userId: string) {
    console.log(userId);
    return this.jobService.createJob(dto, userId);
  }

  @Get()
  findAll() {
    return this.jobService.getAllJobs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.getJobById(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateJobDto) {
    return this.jobService.updateJob(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }
}
