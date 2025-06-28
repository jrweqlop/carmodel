import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandDto {
    @ApiProperty({ type: String })
    name: string
}
