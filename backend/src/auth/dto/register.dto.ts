import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;
}
