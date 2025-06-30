import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ForbiddenException } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { CreatePublicApiDto } from './dto/create-public-api.dto';
import { UpdatePublicApiDto } from './dto/update-public-api.dto';
import { Prisma } from '@prisma/client';
import { CustomBrand, CustomView } from 'src/type/customType';

@Controller('public-api')
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) { }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<CustomView[]> {
    const where: Prisma.BrandWhereInput = {}
    const include: Prisma.BrandInclude = {
      ModelGroup: {
        select: {
          code: true,
          CarModel: {
            select: {
              name: true,
              imagePath: true
            }
          }
        },
      }
    }
    const result = await this.publicApiService.findAll({ where, include });
    if (!result) throw new ForbiddenException()
    const format: CustomView[] = await result.map((item: any) => {
      const value = item['ModelGroup'].map((items) => {
        return {
          [`${items.code}`]: items['CarModel']
        }
      })
      return {
        brand: item.name,
        model: value
      }

    })
    // console.log(format)
    return format
  }

  @Get('dev')
  async GetDev(): Promise<CustomBrand[]> {
    const orderBy: Prisma.BrandOrderByWithRelationInput = {
      id: 'asc'
    }
    const include: Prisma.BrandInclude = {
      ModelGroup: {
        include: {
          CarModel: true
        }
      }
    }
    const result = await this.publicApiService.findAll({ orderBy, include }) as CustomBrand[]
    return result
  }

}
