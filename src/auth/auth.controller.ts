import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDetail) {
    return this.authService.login(loginDetail);
  }

  @Post('register')
  register(@Body() registerDetail: CreateUserDto) {
    console.log(registerDetail);
    return this.authService.signUp(registerDetail);
  }
}
