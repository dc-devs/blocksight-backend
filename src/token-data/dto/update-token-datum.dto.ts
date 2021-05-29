import { PartialType } from '@nestjs/swagger';
import { CreateTokenDatumDto } from './create-token-datum.dto';

export class UpdateTokenDatumDto extends PartialType(CreateTokenDatumDto) {}
