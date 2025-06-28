import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarModel, Prisma } from '@prisma/client';

@ApiTags('car-model')
@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) { }

  @Post()
  @HttpCode(201)
  @HttpCode(400)
  @ApiCreatedResponse({ description: 'Success create car-model' })
  @ApiBadRequestResponse({ description: 'Cannot create' })
  @ApiBody({ type: CreateCarModelDto, isArray: false })
  async create(@Body() body: CreateCarModelDto) {
    const { name } = body
    const data: Prisma.CarModelCreateInput = {
      name,
      imagePath: '',
      modelGroup: {
        connect: {
          id: 0
        }
      }
    }
    const result = await this.carModelService.create(data)
    if (!result) throw new BadRequestException('Cannot create')
    return result
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'success' })
  async findAll(): Promise<CarModel[]> {
    const result = await this.carModelService.findAll({});
    return result
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.carModelService.findOne(+id);
  // }

  @Patch(':id')
  @ApiBody({ type: UpdateCarModelDto, isArray: false })
  async update(@Param('id') id: string,
    @Body() body: UpdateCarModelDto): Promise<CarModel> {
    const where: Prisma.CarModelWhereUniqueInput = { id: +id }
    const data: Prisma.CarModelUpdateInput = body
    const check = await this.carModelService.findOne(where)
    if (!check) throw new NotFoundException("No have CarModel id")
    const result = await this.carModelService.update({ where, data })
    if (!result) throw new BadRequestException("Cannot update CarModele")
    return result
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string) {
    const where: Prisma.CarModelWhereUniqueInput = { id: +id }
    const check = await this.carModelService.findOne(where)
    if (!check) throw new NotFoundException('no have id CarModel')
    const result = await this.carModelService.remove(where);
    return
  }
}
