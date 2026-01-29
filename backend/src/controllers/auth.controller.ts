import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../modules/auth/dtos/register.dto';
import { LoginDto } from '../modules/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto.name, dto.email, dto.password);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto.email, dto.password);
  }
}
