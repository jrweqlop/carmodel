import { Module } from '@nestjs/common';
import { ModelGroupService } from './model-group.service';
import { ModelGroupController } from './model-group.controller';
import { PrismaService } from 'src/PrismaServices/prisma.service';

@Module({
  controllers: [ModelGroupController],
  providers: [ModelGroupService, PrismaService],
})
export class ModelGroupModule { }
