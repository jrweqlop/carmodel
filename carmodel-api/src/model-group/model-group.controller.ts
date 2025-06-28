import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { ModelGroupService } from './model-group.service';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ModelGroup, Prisma } from '@prisma/client';
import { CreateModelGroupDto } from './dto/create-model-group.dto';
import { UpdateModelGroupDto } from './dto/update-model-group.dto';

@ApiTags('model-group')
@Controller('model-group')
export class ModelGroupController {
  constructor(private readonly modelGroupService: ModelGroupService) { }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Success create model-group' })
  create(@Body() body: CreateModelGroupDto) {
    const { code, brandId } = body

    const data: Prisma.ModelGroupCreateInput = {
      code,
      brand: {
        connect: {
          id: brandId
        }
      }
    }
    return this.modelGroupService.create(data);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Success find all data modelgroup' })
  async findAll(): Promise<ModelGroup[]> {
    const result = await this.modelGroupService.findAll({});
    return result
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.modelGroupService.findOne(+id);
  // }

  @Patch(':id')
  @ApiBody({ type: UpdateModelGroupDto, isArray: false })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateModelGroupDto): Promise<ModelGroup> {
    const { code } = body
    const where: Prisma.ModelGroupWhereUniqueInput = { id: +id }
    const check = await this.modelGroupService.findOne(where)
    if (!check) throw new NotFoundException("No have ModelGroup id")
    const data: Prisma.ModelGroupUpdateInput = { code }
    const result = await this.modelGroupService.update({ where, data });
    return result
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Success delete modelgroup' })
  async remove(@Param('id') id: string) {
    const where: Prisma.ModelGroupWhereUniqueInput = { id: +id }
    const check = await this.modelGroupService.findOne(where)
    if (!check) throw new NotFoundException("No have ModelGroup id")
    const result = await this.modelGroupService.remove(where);
    return
  }
}
