import { Injectable } from '@nestjs/common';
import getTokenBalancess from 'src/token-balances/services/covelant/get-token-balances';
import TokenBalancessQueryParams from './interfaces/token-balances-query-params-interface';
import getTokenBalancessFormatted from './utils/get-token-balances-formatted';
import getTotalAssetValue from './utils/get-total-asset-value';
import formatBnToFiat from '../utils/format-bn-to-fiat';

@Injectable()
export class TokenBalancesService {
	async getTokenBalancess({ address, currency }: TokenBalancessQueryParams) {
		const TokenBalancess = await getTokenBalancess({
			address,
			currency,
		});
		const TokenBalancessFormatted = getTokenBalancessFormatted({
			TokenBalancess,
		});

		const totalValue = getTotalAssetValue({ TokenBalancess });
		const totalValueFormatted = formatBnToFiat({
			currency,
			format: '0,0.00',
			bigNumber: totalValue,
		});

		return {
			totalValue: {
				string: totalValue,
				formatted: totalValueFormatted,
			},
			balances: TokenBalancessFormatted,
		};
	}
}
