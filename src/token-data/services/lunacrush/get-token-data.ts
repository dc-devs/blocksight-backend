import axios from 'axios';
import LunacrushTokenData from '../../interfaces/lunacrush-token-data-interface';
import LunacrushTokenDatas from '../../interfaces/lunacrush-token-datas-interface';

const convertArrayToObject = (dataArray: []) => {
	const tokenData = {} as LunacrushTokenDatas;

	dataArray.forEach((lunaTokenData: LunacrushTokenData) => {
		tokenData[lunaTokenData.symbol] = lunaTokenData;
	});

	return tokenData;
};

const getTokenData = async (symbols: string) => {
	const apiKey = process.env.LUNA_CRUSH_API_KEY;
	const url = `https://api.lunarcrush.com/v2?data=assets&key=${apiKey}&data_points=1&symbol=${symbols}`;
	const response: any = await axios.get(url);
	const { data } = response.data;
	const tokenData = convertArrayToObject(data);

	return tokenData;
};

export default getTokenData;
