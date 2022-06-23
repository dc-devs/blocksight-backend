import { Resolver, Query, Args } from '@nestjs/graphql';
import { TokenBalances } from './models/token-balances.model';
import { TokenBalancesService } from './token-balances.service';
import { GetTokenBalancesInput } from './dto/get-token-balances.input';

@Resolver(() => TokenBalances)
export class TokenBalancesResolver {
	constructor(private readonly tokenBalancesService: TokenBalancesService) {}

	@Query(() => TokenBalances, { nullable: true })
	async getTokenBalances(
		@Args('getTokenBalancesInput')
		getTokenBalancesInput: GetTokenBalancesInput,
	) {
		const { filter, address, currency } = getTokenBalancesInput;

		const tokenBalances = await this.tokenBalancesService.getTokenBalances({
			filter,
			address,
			currency,
		});

		return tokenBalances;
	}
}
