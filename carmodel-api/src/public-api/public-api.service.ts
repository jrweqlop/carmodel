import { Injectable } from '@nestjs/common';
import { CreatePublicApiDto } from './dto/create-public-api.dto';
import { UpdatePublicApiDto } from './dto/update-public-api.dto';
import { PrismaService } from 'src/PrismaServices/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PublicApiService {

  constructor(private readonly prisma: PrismaService) { }

  // create(createPublicApiDto: CreatePublicApiDto) {
  //   return 'This action adds a new publicApi';
  // }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BrandWhereUniqueInput;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput;
    include?: Prisma.BrandInclude
  }): Promise<object[]> {
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

  // findOne(id: number) {
  //   return `This action returns a #${id} publicApi`;
  // }

  // update(id: number, updatePublicApiDto: UpdatePublicApiDto) {
  //   return `This action updates a #${id} publicApi`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} publicApi`;
  // }
}
