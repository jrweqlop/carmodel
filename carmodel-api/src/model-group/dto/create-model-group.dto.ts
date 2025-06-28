import { ApiProperty } from "@nestjs/swagger";

export class CreateModelGroupDto {
    @ApiProperty({ type: Number })
    brandId: number

    @ApiProperty({ type: String })
    code: string
}

