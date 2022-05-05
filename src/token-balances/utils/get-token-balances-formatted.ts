import * as numeral from 'numeral';
import getFormattedTokenBalances from './get-formatted-token-balance';
import TokenDisplayData from '../interfaces/token-balance-interface';
import CovalentTokenBalances from '../../interfaces/covalent-token-balance-interface';

interface TokenBalancess {
	TokenBalancess: CovalentTokenBalances[];
}

const getTokenBalancesFormatted = ({
	TokenBalancess,
}: TokenBalancess): TokenDisplayData[] => {
	return TokenBalancess.map((TokenBalances) => {
		const {
			quote,
			balance,
			logo_url,
			quote_rate,
			contract_name,
			contract_address,
			contract_decimals,
			contract_ticker_symbol,
		} = TokenBalances;
		const tokenLogoUrl = logo_url;
		const tokenName = contract_name;
		const tokenSymbol = contract_ticker_symbol.toUpperCase();

		const TokenBalancesAmountFormatted = getFormattedTokenBalances({
			balance,
			contractDecimals: contract_decimals,
		});

		const tokenPrice = quote_rate || 0;
		const tokenPriceFormatted = numeral(tokenPrice).format('$0,000.000');
		const totalValueFormatted = numeral(quote).format('$0,000.00');

		return {
			name: tokenName,
			symbol: tokenSymbol,
			logoUrl: tokenLogoUrl,
			contractAddress: contract_address,
			balance: TokenBalancesAmountFormatted,
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