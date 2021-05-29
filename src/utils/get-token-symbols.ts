import CovalentTokenBalance from '../token-data/interfaces/covalent-token-balance-interface';

const getTokenSymbols = (tokenBalances: CovalentTokenBalance[]) => {
	let symbols = '';

	tokenBalances.forEach((token, index) => {
		if (index === 0) {
			symbols += `${token.contract_ticker_symbol}`;
		} else {
			symbols += `,${token.contract_ticker_symbol}`;
		}
	});

	return symbols;
};

export default getTokenSymbols;
