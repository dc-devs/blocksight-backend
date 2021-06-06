import axios from 'axios';

const getTokenData = async (address: string) => {
	const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`;

	const response: any = await axios.get(url);
	const { data } = response;

	return data;
};

export default getTokenData;
