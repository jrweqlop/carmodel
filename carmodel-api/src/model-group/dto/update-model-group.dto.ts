import { PartialType } from '@nestjs/mapped-types';
import { CreateModelGroupDto } from './create-model-group.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateModelGroupDto {
    @ApiProperty({ type: String })
    code: string
}
