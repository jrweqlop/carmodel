import { ApiProperty } from "@nestjs/swagger"

export class CreateCarModelDto {
    @ApiProperty({ type: String })
    name: string

    // @ApiProperty({ type: String })
    // imagePath: string

    @ApiProperty({ type: Number })
    modelGroupId: number
}

export class uploadImageDto {

    @ApiProperty({ type: String, format: 'binary' })
    image: object

}