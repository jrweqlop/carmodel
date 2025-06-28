import { Injectable } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { PrismaService } from 'src/PrismaServices/prisma.service';
import { CarModel, Prisma } from '@prisma/client';

@Injectable()
export class CarModelService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.CarModelCreateInput): Promise<CarModel> {
    const result = await this.prisma.carModel.create({ data })
    return result
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CarModelWhereUniqueInput;
    where?: Prisma.CarModelWhereInput;
    orderBy?: Prisma.CarModelOrderByWithRelationInput;
    include?: Prisma.CarModelInclude;
  }): Promise<CarModel[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.carModel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async findOne(where: Prisma.CarModelWhereUniqueInput): Promise<CarModel | null> {
    const result = await this.prisma.carModel.findUnique({ where })
    return result
  }

  async update(params: {
    where: Prisma.CarModelWhereUniqueInput;
    data: Prisma.CarModelUpdateInput;
  }): Promise<CarModel> {
    const { where, data } = params
    const result = await this.prisma.carModel.update({ where, data })
    return result
  }

  async remove(where: Prisma.CarModelWhereUniqueInput): Promise<CarModel> {
    const result = await this.prisma.carModel.delete({ where })
    return result
  }
}
