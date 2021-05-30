import * as numeral from 'numeral';
import getFormattedTokenBalance from './get-formatted-token-balance';
import TokenDisplayData from '../interfaces/token-balance-interface';
import CovalentTokenBalance from '../interfaces/covalent-token-balance-interface';

interface TokenBalances {
	tokenBalances: CovalentTokenBalance[];
}

const getTokenBalancesFormatted = ({
	tokenBalances,
}: TokenBalances): TokenDisplayData[] => {
	return tokenBalances.map((tokenBalance) => {
		const {
			quote,
			balance,
			logo_url,
			quote_rate,
			contract_name,
			contract_address,
			contract_decimals,
			contract_ticker_symbol,
		} = tokenBalance;
		const tokenLogoUrl = logo_url;
		const tokenName = contract_name;
		const tokenSymbol = contract_ticker_symbol.toUpperCase();

		const tokenBalanceAmountFormatted = getFormattedTokenBalance({
			balance,
			contractDecimals: contract_decimals,
		});

		const tokenPrice = quote_rate || 0;
		const tokenPriceFormatted = numeral(tokenPrice).format('$0,0.00000');
		const totalValueFormatted = numeral(quote).format('$0,0.00000');

		return {
			name: tokenName,
			symbol: tokenSymbol,
			logoUrl: tokenLogoUrl,
			contractAddress: contract_address,
			balance: tokenBalanceAmountFormatted,
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
