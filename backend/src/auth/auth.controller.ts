import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in and JWT token returned.' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
