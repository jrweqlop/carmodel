import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post()
  @ApiBody({ type: CreateAuthDto, isArray: false })
  async login(
    @Body() data: CreateAuthDto
  ) {
    console.log(data)
    const result = await this.authService.findOne(data.username)
    if (!result) throw new NotFoundException('error username')
    const genToken = await this.authService.signIn(result, data.password)
    return genToken
  }
}
