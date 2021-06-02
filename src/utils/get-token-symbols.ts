import CovalentTokenBalances from '../token-balances/interfaces/covalent-token-balance-interface';

const getTokenSymbols = (TokenBalancess: CovalentTokenBalances[]) => {
	let symbols = '';

	TokenBalancess.forEach((token, index) => {
		if (index === 0) {
			symbols += `${token.contract_ticker_symbol}`;
		} else {
			symbols += `,${token.contract_ticker_symbol}`;
		}
	});

	return symbols;
};

export default getTokenSymbols;
