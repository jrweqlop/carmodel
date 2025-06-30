import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarModelDto {
    @ApiProperty({ type: String })
    name: string

    // @ApiProperty({ type: String })
    // imagePath: string
}
