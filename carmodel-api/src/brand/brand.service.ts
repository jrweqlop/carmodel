import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand, Prisma } from '@prisma/client';
import { PrismaService } from 'src/PrismaServices/prisma.service';

@Injectable()
export class BrandService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.BrandCreateInput): Promise<Brand> {
    const result = await this.prisma.brand.create({ data })
    return result
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BrandWhereUniqueInput;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput;
    include?: Prisma.BrandInclude
  }): Promise<Brand[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.brand.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    });
  }

  async findOne(where: Prisma.BrandWhereUniqueInput): Promise<Brand | null> {
    const result = await this.prisma.brand.findUnique({ where })
    return result
  }

  async update(parasm: {
    where: Prisma.BrandWhereUniqueInput;
    data: Prisma.BrandUpdateInput
  }): Promise<Brand> {
    const { where, data } = parasm
    const result = await this.prisma.brand.update({ where, data })
    return result
  }

  async remove(where: Prisma.BrandWhereUniqueInput): Promise<Brand> {
    const result = await this.prisma.brand.delete({ where })
    return result
  }
}
