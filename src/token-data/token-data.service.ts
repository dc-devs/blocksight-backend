import { Injectable } from '@nestjs/common';
import getTokenBalances from 'src/token-data/services/covelant/get-token-balances';
import TokenBalancesQueryParams from './interfaces/token-balances-query-params-interface';
import getTokenBalancesFormatted from './utils/get-token-balances-formatted';
import getTotalAssetValue from './utils/get-total-asset-value';
import formatBnToFiat from '../utils/format-bn-to-fiat';

@Injectable()
export class TokenDataService {
	async getTokenBalances({ address, currency }: TokenBalancesQueryParams) {
		const tokenBalances = await getTokenBalances({
			address,
			currency,
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
			totalValue: totalValueFormatted,
			balances: tokenBalancesFormatted,
		};
	}
}
