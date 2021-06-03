import { Controller, Get, Query } from '@nestjs/common';
import { TokenBalancesService } from './token-balances.service';
import TokenBalancessQueryParams from './interfaces/token-balances-query-params-interface';

@Controller()
export class TokenBalancesController {
	constructor(private readonly tokenBalancesService: TokenBalancesService) {}

	@Get('token-balances')
	async getTokenBalancess(@Query() query: TokenBalancessQueryParams) {
		const { address, currency, filter } = query;
		const TokenBalances = await this.tokenBalancesService.getTokenBalancess(
			{
				address,
				currency,
				filter,
			}
		);

		return TokenBalances;
	}
}
