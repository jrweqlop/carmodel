import { PartialType } from '@nestjs/swagger';
import { CreatePublicApiDto } from './create-public-api.dto';

export class UpdatePublicApiDto extends PartialType(CreatePublicApiDto) {}
