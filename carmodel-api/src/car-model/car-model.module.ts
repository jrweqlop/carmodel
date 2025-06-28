import { Module } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CarModelController } from './car-model.controller';
import { PrismaService } from 'src/PrismaServices/prisma.service';

@Module({
  controllers: [CarModelController],
  providers: [CarModelService, PrismaService],
})
export class CarModelModule { }
