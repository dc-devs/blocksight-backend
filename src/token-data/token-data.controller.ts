import { Controller, Get, Query } from '@nestjs/common';
import { TokenDataService } from './token-data.service';
import TokenBalancesQueryParams from './interfaces/token-balances-query-params-interface';

@Controller()
export class TokenDataController {
	constructor(private readonly tokenDataService: TokenDataService) {}

	@Get('token-balances')
	async getTokenBalances(@Query() query: TokenBalancesQueryParams) {
		const { address, currency } = query;
		const tokenData = await this.tokenDataService.getTokenBalances({
			address,
			currency,
		});

		return tokenData;
	}
}
