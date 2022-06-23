import numeral from 'numeral';
import BigNumber from 'bignumber.js';
import getFormattedTokenBalances from './get-formatted-token-balance';
import TokenDisplayData from '../interfaces/token-balance-interface';
import CovalentTokenBalances from '../../../interfaces/covalent-token-balance-interface';

interface TokenBalances {
	tokenBalances: CovalentTokenBalances[];
}

const getTokenBalancesFormatted = ({
	tokenBalances,
}: TokenBalances): TokenDisplayData[] => {
	return tokenBalances.map((tokenBalances) => {
		const {
			quote,
			balance,
			logo_url,
			quote_rate,
			contract_name,
			contract_address,
			contract_decimals,
			contract_ticker_symbol,
		} = tokenBalances;
		const tokenLogoUrl = logo_url;
		const tokenName = contract_name;
		const tokenSymbol = contract_ticker_symbol.toUpperCase();

		const tokenBalancesAmountFormatted = getFormattedTokenBalances({
			balance,
			contractDecimals: contract_decimals,
		});

		let quoteRate;

		if (!quote_rate) {
			quoteRate = 0;
		} else {
			quoteRate = quote_rate.toString().includes('e') ? 0 : quote_rate;
		}

		const tokenPrice = quoteRate || 0;
		const tokenPriceFormatted = numeral(tokenPrice).format('$0,000.000');
		const totalValueFormatted = numeral(quote).format('$0,000.00');

		return {
			name: tokenName,
			symbol: tokenSymbol,
			logoUrl: tokenLogoUrl,
			contractAddress: contract_address,
			balance: tokenBalancesAmountFormatted,
			price: {
				number: tokenPrice,
				formatted: tokenPriceFormatted,
			},
			totalValue: {
				number: quote,
				formatted: totalValueFormatted,
			},
		};
	});
};

export default getTokenBalancesFormatted;
