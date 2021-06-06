import axios from 'axios';
import LunacrushTokenBalances from '../../token-balances/interfaces/lunacrush-token-data-interface';
import LunacrushTokenBalancess from '../../token-balances/interfaces/lunacrush-token-datas-interface';

const convertArrayToObject = (dataArray: []) => {
	const TokenBalances = {} as LunacrushTokenBalancess;

	dataArray.forEach((lunaTokenBalances: LunacrushTokenBalances) => {
		TokenBalances[lunaTokenBalances.symbol] = lunaTokenBalances;
	});

	return TokenBalances;
};

const getTokenBalances = async (symbols: string) => {
	const apiKey = process.env.LUNA_CRUSH_API_KEY;
	const url = `https://api.lunarcrush.com/v2?data=assets&key=${apiKey}&data_points=1&symbol=${symbols}`;
	const response: any = await axios.get(url);
	const { data } = response.data;
	const TokenBalances = convertArrayToObject(data);

	return TokenBalances;
};

export default getTokenBalances;
