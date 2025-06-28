import { Module } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { PublicApiController } from './public-api.controller';
import { PrismaService } from 'src/PrismaServices/prisma.service';

@Module({
  controllers: [PublicApiController],
  providers: [PublicApiService, PrismaService],
})
export class PublicApiModule { }
