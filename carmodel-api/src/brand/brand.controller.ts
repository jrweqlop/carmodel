import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, BadRequestException } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Brand, Prisma } from '@prisma/client';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Post()
  @HttpCode(201)
  @HttpCode(400)
  @ApiCreatedResponse({ description: 'Success create brand' })
  @ApiBadRequestResponse({ description: 'Cannot create' })
  @ApiBody({ type: CreateBrandDto, isArray: false })
  async create(@Body() body: CreateBrandDto) {
    const { name } = body
    const data: Prisma.BrandCreateInput = { name }
    const result = await this.brandService.create(data)
    if (!result) throw new BadRequestException('Cannot create')
    return result
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'success' })
  async findAll(): Promise<Brand[]> {
    const result = await this.brandService.findAll({});
    return result
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.brandService.findOne(+id);
  // }

  @Patch(':id')
  @ApiBody({ type: UpdateBrandDto, isArray: false })
  async update(@Param('id') id: string,
    @Body() body: UpdateBrandDto): Promise<Brand> {
    const where: Prisma.BrandWhereUniqueInput = { id: +id }
    const data: Prisma.BrandUpdateInput = body
    const check = await this.brandService.findOne(where)
    if (!check) throw new NotFoundException("No have brand id")
    const result = await this.brandService.update({ where, data })
    if (!result) throw new BadRequestException("Cannot update brande")
    return result
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string) {
    const where: Prisma.BrandWhereUniqueInput = { id: +id }
    const check = await this.brandService.findOne(where)
    if (!check) throw new NotFoundException('no have id brand')
    const result = await this.brandService.remove(where);
    return
  }
}
