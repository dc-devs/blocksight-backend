import { Injectable } from '@nestjs/common';
import getTokenBalances from './utils/get-token-balances';
import formatBnToFiat from '../../utils/format-bn-to-fiat';
import getTotalTokenBalanceValue from './utils/get-total-token-balance-value';

interface ITokenBalancesInput {
	address: string;
	currency: string;
	filter: string;
}

@Injectable()
export class TokenBalancesService {
	async getTokenBalances({ filter, address, currency }: ITokenBalancesInput) {
		let tokenBalances = await getTokenBalances({
			address,
			currency,
			filter,
			chainId: process.env.ETHEREUM_CHAIN_ID,
		});

		const totalValue = getTotalTokenBalanceValue({
			tokenBalances,
		});

		const totalValueString = totalValue.toString();

		const formattedTotalValue = formatBnToFiat({
			currency,
			format: '0,0.00',
			bigNumber: totalValue,
		});

		return {
			totalValue: {
				value: totalValueString,
				formatted: formattedTotalValue,
			},
			balances: tokenBalances,
		};
	}
}
