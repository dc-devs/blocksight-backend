import axios from 'axios';
import NomicsTokenBalances from '../../interfaces/nomics-token-data-interface';
import NomicsTokenBalancess from '../../interfaces/nomics-token-datas-interface';

const convertArrayToObject = (dataArray: []) => {
	const TokenBalances = {} as NomicsTokenBalancess;

	dataArray.forEach((nomicTokenBalances: NomicsTokenBalances) => {
		TokenBalances[nomicTokenBalances.id] = nomicTokenBalances;
	});

	return TokenBalances;
};

const getTokenBalances = async (symbols: string) => {
	const apiKey = process.env.NOMICS_API_KEY;
	const url = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&interval=1d&convert=USD&per-page=100&page=1&ids=${symbols}`;
	const response: any = await axios.get(url);
	const { data } = response;
	const TokenBalances = convertArrayToObject(data);

	return TokenBalances;
};

export default getTokenBalances;
