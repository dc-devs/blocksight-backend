import axios from 'axios';

interface IScamToken {
	address: string;
	chainId: string;
}

interface IData {
	tokens: IScamToken[];
}

interface IResponse {
	data: IData;
}

const getScamTokensMap = async () => {
	const scamTokensMap = {};
	const url =
		'https://raw.githubusercontent.com/dappradar/tokens-blacklist/main/all-tokens.json';

	const response: IResponse = await axios.get(url);
	const { data } = response;

	const { tokens } = data;

	tokens.forEach((token) => {
		const { address, chainId } = token;

		if (!scamTokensMap[chainId]) {
			scamTokensMap[chainId] = {};
		}

		scamTokensMap[chainId][address] = true;
	});

	return scamTokensMap;
};

export default getScamTokensMap;
