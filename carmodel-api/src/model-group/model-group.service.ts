import { Injectable } from '@nestjs/common';
import { CreateModelGroupDto } from './dto/create-model-group.dto';
import { UpdateModelGroupDto } from './dto/update-model-group.dto';
import { PrismaService } from 'src/PrismaServices/prisma.service';
import { ModelGroup, Prisma } from '@prisma/client';

@Injectable()
export class ModelGroupService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.ModelGroupCreateInput): Promise<ModelGroup> {
    const result = await this.prisma.modelGroup.create({ data })
    return result
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ModelGroupWhereUniqueInput;
    where?: Prisma.ModelGroupWhereInput;
    orderBy?: Prisma.ModelGroupOrderByWithRelationInput;
    include?: Prisma.ModelGroupInclude;
  }): Promise<ModelGroup[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.modelGroup.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async findOne(where: Prisma.ModelGroupWhereUniqueInput): Promise<ModelGroup | null> {
    const result = await this.prisma.modelGroup.findUnique({ where })
    return result
  }

  async update(params: {
    where: Prisma.ModelGroupWhereUniqueInput;
    data: Prisma.ModelGroupUpdateInput;
  }): Promise<ModelGroup> {
    const { where, data } = params
    const result = await this.prisma.modelGroup.update({ where, data })
    return result
  }

  async remove(where: Prisma.ModelGroupWhereUniqueInput): Promise<ModelGroup> {
    const result = await this.prisma.modelGroup.delete({ where })
    return result
  }
}
