import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List of all users and their applications.' })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
