import { Controller, Get } from '@nestjs/common';
import { TokenDataService } from './token-data.service';
import { CreateTokenDatumDto } from './dto/create-token-datum.dto';
import { UpdateTokenDatumDto } from './dto/update-token-datum.dto';

@Controller('token-data')
export class TokenDataController {
	constructor(private readonly tokenDataService: TokenDataService) {}

	@Get(':id')
	getTokenData() {
		return this.tokenDataService.getTokenData();
	}
}
