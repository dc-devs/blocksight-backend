import { Controller, Get, Query } from '@nestjs/common';
import { TokenBalancesService } from './token-balances.service';
import TokenBalancessQueryParams from './interfaces/token-balances-query-params-interface';

@Controller()
export class TokenBalancesController {
	constructor(private readonly TokenBalancesService: TokenBalancesService) {}

	@Get('token-balances')
	async getTokenBalancess(@Query() query: TokenBalancessQueryParams) {
		const { address, currency } = query;
		const TokenBalances = await this.TokenBalancesService.getTokenBalancess(
			{
				address,
				currency,
			}
		);

		return TokenBalances;
	}
}
