import axios from 'axios';
import TokenBalancesQueryParams from '../../models/token-balances/interfaces/token-balances-query-params-interface';
import CovalentTokenBalances from '../../interfaces/covalent-token-balance-interface';

const getTokenBalances = async ({
	filter,
	address,
	currency = 'usd',
}: TokenBalancesQueryParams): Promise<CovalentTokenBalances[]> => {
	const chainId = process.env.ETHEREUM_CHAIN_ID;
	const convalentApiKey = process.env.COVALENT_API_KEY;
	let url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${convalentApiKey}&nft=true&no-nft-fetch=false&quote-currency=${currency}`;

	if (filter) {
		const filterUppercase = filter.toUpperCase();
		url += `&match={"contract_ticker_symbol":"${filterUppercase}"}`;
	}

	const response: any = await axios.get(url);
	const { data } = response.data;
	const { items } = data;

	return items;
};

export default getTokenBalances;
