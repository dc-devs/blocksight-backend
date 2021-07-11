import axios from 'axios';
import tokenAddressTokenMap from '../../mock-db/token-address-token-map';

const getTokenData = async (address: string) => {
	let tokenData;
	const dbTokenData = tokenAddressTokenMap[address];

	if (dbTokenData) {
		tokenData = dbTokenData;
	} else {
		const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`;

		const response: any = await axios.get(url);
		const { data } = response;

		tokenData = data;
	}

	return tokenData;
};

export default getTokenData;
