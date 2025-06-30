import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto, uploadImageDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarModel, Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarmodelView } from 'src/type/customType';
import { DeleteFileImage, FileSetting } from 'src/shared/fileSystem';

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
    const { name, modelGroupId } = body
    const data: Prisma.CarModelCreateInput = {
      name,
      imagePath: '',
      modelGroup: {
        connect: {
          id: modelGroupId
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

  @Patch('upload/:id')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Car model', type: uploadImageDto })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<CarModel> {
    let model = ''
    let currentPath = ''
    const { mimetype } = file as Express.Multer.File
    const where: Prisma.CarModelWhereInput = {
      id: +id
    }
    const include: Prisma.CarModelInclude = {
      modelGroup: {
        select: {
          code: true
        }
      }
    }
    const findCarmodel = await this.carModelService.findAll({ where, include }) as CarmodelView[]
    if (findCarmodel.length > 0) {
      model = findCarmodel[0].modelGroup.code.toLocaleLowerCase().replace('-', "").trim().toLocaleLowerCase()
      if (findCarmodel[0].imagePath !== '') {
        currentPath = findCarmodel[0].imagePath.replace('assets/images', "./public").trim()
      }
    }
    if (!mimetype.includes('image')) {
      throw new BadRequestException('File is not iamge type')
    }
    if (model === '') throw new BadRequestException('No have model car')

    const createImages = await FileSetting(model, file, currentPath)
    if (!createImages) throw new BadRequestException('Cannot upload image')

    const whereUpdate: Prisma.CarModelWhereUniqueInput = { id: +id }
    const data: Prisma.CarModelUpdateInput = {
      imagePath: createImages
    }
    const result = await this.carModelService.update({ where: whereUpdate, data })
    if (!result) throw new BadRequestException('Cannot update data car')
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
    if (result) {
      const delImgPath = result.imagePath.replace('assets/images', "./public").trim()
      const status = await DeleteFileImage(delImgPath)
      console.log('status delete file ', status)
    }
    return
  }
}
