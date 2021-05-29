import { Injectable } from '@nestjs/common';
import { CreateTokenDatumDto } from './dto/create-token-datum.dto';
import { UpdateTokenDatumDto } from './dto/update-token-datum.dto';

@Injectable()
export class TokenDataService {
	getTokenData() {
		return `Token Data`;
	}
}
