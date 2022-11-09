import BigNumber from 'bignumber.js';

const getDefaultCandleStick = () => {
	return {
		open: {
			value: '0',
			bn: new BigNumber(0),
		},
		close: {
			value: '0',
			bn: new BigNumber(0),
		},
		high: {
			value: '0',
			bn: new BigNumber(0),
		},
		low: {
			value: '0',
			bn: new BigNumber(0),
		},
	};
};

export default getDefaultCandleStick;
