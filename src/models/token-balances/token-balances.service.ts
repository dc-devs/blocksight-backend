import { Injectable } from '@nestjs/common';
import { scamTokens } from './constants';
import formatBnToFiat from '../../utils/format-bn-to-fiat';
import getTotalAssetValue from './utils/get-total-asset-value';
import getTokenBalances from '../../services/covelant/get-token-balances';
import getTokenBalancesFormatted from './utils/get-token-balances-formatted';
import TokenBalancesQueryInput from './interfaces/token-balances-query-params-interface';

@Injectable()
export class TokenBalancesService {
	async getTokenBalances({
		filter,
		address,
		currency,
	}: TokenBalancesQueryInput) {
		let tokenBalances = await getTokenBalances({
			address,
			currency,
			filter,
		});

		tokenBalances = tokenBalances.filter((tokenBalance) => {
			const {contract_address} = tokenBalance;
			
			return !scamTokens[contract_address];
		});

		const tokenBalancesFormatted = getTokenBalancesFormatted({
			tokenBalances,
		});

		const totalValue = getTotalAssetValue({ tokenBalances });

		const totalValueFormatted = formatBnToFiat({
			currency,
			format: '0,0.00',
			bigNumber: totalValue,
		});

		return {
			totalValue: {
				number: totalValue.toString(),
				formatted: totalValueFormatted,
			},
			balances: tokenBalancesFormatted,
		};
	}
}
