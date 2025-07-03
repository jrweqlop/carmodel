import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiBody({ type: CreateAuthDto, isArray: false })
  async login(
    @Body() data: CreateAuthDto
  ) {
    console.log(data)
    return
  }
}
