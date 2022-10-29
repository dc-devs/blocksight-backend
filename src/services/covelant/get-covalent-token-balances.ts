import axios from 'axios';

interface ITokenBalancesInput {
	address: string;
	currency: string;
	filter: string;
	chainId: string;
}

interface ICovalentTokenBalance {
	contract_decimals: number;
	contract_name: string;
	contract_address: string;
	contract_ticker_symbol: string;
	supports_erc: string[];
	logo_url: string;
	type: string;
	balance: string;
	nft_data: string | null;
	quote: number;
	quote_rate: number;
	[key: string]: number | null | string | string[];
}

interface ICovalentData {
	items: ICovalentTokenBalance[];
}

interface IData {
	data: ICovalentData;
}

interface IResponse {
	data: IData;
}

const getCovalentTokenBalances = async ({
	filter,
	address,
	chainId,
	currency = 'usd',
}: ITokenBalancesInput): Promise<ICovalentTokenBalance[]> => {
	const convalentApiKey = process.env.COVALENT_API_KEY;
	let url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${convalentApiKey}&nft=false&no-nft-fetch=false&quote-currency=${currency}`;

	if (filter) {
		const filterUppercase = filter.toUpperCase();
		url += `&match={"contract_ticker_symbol":"${filterUppercase}"}`;
	}

	const response: IResponse = await axios.get(url);
	const { data } = response.data;
	const { items } = data;

	return items;
};

export default getCovalentTokenBalances;
