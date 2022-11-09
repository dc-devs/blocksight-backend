import getDefaultFootprint from './get-default-footprint';
import getDefaultCandleStick from './get-default-candlestick';

const raw = {
	buys: [],
	sells: [],
};

const footprint = {
	totals: getDefaultFootprint(),
};

const candleStick = getDefaultCandleStick();

const getDefaultTickData = () => {
	return {
		raw,
		footprint,
		candleStick,
	};
};

export default getDefaultTickData;
