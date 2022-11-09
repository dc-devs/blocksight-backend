import BigNumber from 'bignumber.js';

const getDefaultFootprint = () => {
	return {
		sellVolume: {
			value: '0',
			bn: new BigNumber(0),
		},
		buyVolume: {
			value: '0',
			bn: new BigNumber(0),
		},
		totalVolume: {
			value: '0',
			bn: new BigNumber(0),
		},
		deltaVolume: {
			value: '0',
			bn: new BigNumber(0),
		},
	};
};

export default getDefaultFootprint;
