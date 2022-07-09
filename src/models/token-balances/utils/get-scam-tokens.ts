import axios from 'axios';
import IScamTokens from '../interfaces/scam-tokens-interface';

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

const initialScamTokensPolygon = {
	'0xefa1aa32976e3f19da5e649fdeec77b72469bfb3': true,
	'0x7bfe43e475ebea07fa03337da551e18502c8793c': true,
	'0xc229cc41f523f165436f2d52c62b80602cd76f51': true,
	'0x8764bf0377fac982a5fc62e04c9765e37a113554': true,
	'0xf5f941cccf571a8bddd4420af269427394aed8fe': true,
	'0x043a0d3e1c7dde9c4e9d7a768992e4451e5a3a0e': true,
	'0x23a8c2ce858b2e66222567923641cb6417994caf': true,
	'0x2953399124f0cbb46d2cbacd8a89cf0599974963': true,
	'0x7ac04336b214ea81546685d2bf27222bc4ee02ea': true,
};

const getScamTokensMap = async (): Promise<IScamTokens> => {
	const scamTokens: IScamTokens = {
		'137': initialScamTokensPolygon,
	};
	const url =
		'https://raw.githubusercontent.com/dappradar/tokens-blacklist/main/all-tokens.json';

	const response: IResponse = await axios.get(url);
	const { data } = response;

	const { tokens } = data;

	tokens.forEach((token) => {
		const { address, chainId } = token;

		if (!scamTokens[chainId]) {
			scamTokens[chainId] = {};
		}

		scamTokens[chainId][address] = true;
	});

	return scamTokens;
};

export default getScamTokensMap;
