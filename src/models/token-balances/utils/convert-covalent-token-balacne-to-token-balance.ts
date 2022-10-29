import getPrice from './get-price';
import formatBalance from './format-balance';
import formatToCurrency from './format-to-currency';
import ITokenBalance from '../interfaces/token-balance-interface';
import CovalentTokenBalance from '../../../interfaces/covalent-token-balance-interface';

interface IProps {
	chainId: string;
	tokenBalance: CovalentTokenBalance;
}

const convertCovalentTokenBalanceToTokenBalance = ({
	chainId,
	tokenBalance,
}: IProps): ITokenBalance => {
	const {
		type,
		quote,
		logo_url,
		quote_rate,
		supports_erc,
		contract_name,
		contract_address,
		contract_decimals,
		contract_ticker_symbol,
		balance: covalentBalance,
	} = tokenBalance;
	const totalValue = quote;
	const totalValueString = String(quote);
	const logoUrl = logo_url;
	const name = contract_name;
	const isNft = type === 'nft';
	const supportsErc = supports_erc;
	const decimals = contract_decimals;
	const price = getPrice(quote_rate);
	const contractAddress = contract_address;
	const symbol = contract_ticker_symbol.toUpperCase();
	const balance = formatBalance({
		balance: covalentBalance,
		contractDecimals: contract_decimals,
	});

	const formattedPrice = formatToCurrency(price, '.0000');
	const formattedTotalValue = formatToCurrency(totalValue);

	return {
		type,
		name,
		isNft,
		symbol,
		chainId,
		logoUrl,
		balance,
		decimals,
		supportsErc,
		contractAddress,
		price: {
			value: price,
			formatted: formattedPrice,
		},
		totalValue: {
			value: totalValueString,
			formatted: formattedTotalValue,
		},
	};
};

export default convertCovalentTokenBalanceToTokenBalance;
