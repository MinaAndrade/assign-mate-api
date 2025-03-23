import { Controller, Post, Body, Res, HttpStatus, Get, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'REGISTER', description: 'Public endpoint to register a new user.' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'LOGIN', description: 'Public endpoint to login and get the Access Token.' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto.email, loginUserDto.password);
  }

  @Get('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'REFRESH TOKEN', description: 'Private endpoint to refresh the Access Token.' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Auth()
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}