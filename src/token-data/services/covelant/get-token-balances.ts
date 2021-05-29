import axios from 'axios';
import TokenBalancesQueryParams from '../../interfaces/token-balances-query-params-interface';
import CovalentTokenBalance from '../../interfaces/covalent-token-balance-interface';

const getTokenBalances = async ({
	address,
	currency,
}: TokenBalancesQueryParams): Promise<CovalentTokenBalance[]> => {
	const chainId = process.env.ETHEREUM_CHAIN_ID;
	const convalentApiKey = process.env.COVALENT_API_KEY;
	const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${convalentApiKey}&nft=true&no-nft-fetch=false&quote-currency=${currency}`;
	const response: any = await axios.get(url);
	const { data } = response.data;
	const { items } = data;

	return items;
};

export default getTokenBalances;
