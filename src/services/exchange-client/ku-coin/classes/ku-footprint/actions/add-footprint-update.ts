import BigNumber from 'bignumber.js';
import { IMatchExecutionMessage } from '../interfaces';

enum Side {
	Buy = 'buy',
	Sell = 'sell',
}

interface IOptions {
	footprintUpdates: any;
	message: string;
}

interface IGetDateOptions {
	time: string;
}

const convertKuTimeToTimestamp = ({ time }: IGetDateOptions) => {
	const timeNanoseconds = Number(time);
	const timestamp = Math.round(timeNanoseconds / 1000000);

	return timestamp;
};

interface IGetCurrentTimeOptions {
	timestamp: number;
}

const getCurrentTime = ({ timestamp }: IGetCurrentTimeOptions) => {
	const jsDate = new Date(timestamp);

	const date = jsDate.getDate();
	const month = jsDate.getMonth() + 1;
	const year = jsDate.getFullYear();
	const hours = jsDate.getHours();
	const minutes = jsDate.getMinutes();

	return `${month}/${date}/${year}-${hours}:${minutes}`;
};

const addFootPrintUpdate = ({ footprintUpdates, message }: IOptions) => {
	const parsedMessage: IMatchExecutionMessage = JSON.parse(message);
	const { data } = parsedMessage;
	const { side, time, size, price } = data;
	const timestamp = convertKuTimeToTimestamp({ time });
	const currentTime = getCurrentTime({ timestamp });
	const sizeBN = new BigNumber(size);
	const priceBN = new BigNumber(price);

	data.timestamp = timestamp;

	if (!footprintUpdates[currentTime]) {
		footprintUpdates[currentTime] = {
			raw: {
				buys: [],
				sells: [],
			},
			footprint: {
				totals: {
					buyVolume: {
						value: '0',
						bn: new BigNumber(0),
					},
					sellVolume: {
						value: '0',
						bn: new BigNumber(0),
					},
					deltaVolume: {
						value: '0',
						bn: new BigNumber(0),
					},
					totalVolume: {
						value: '0',
						bn: new BigNumber(0),
					},
				},
			},
			candleStick: {
				firstPrice: {
					value: '0',
					bn: new BigNumber(0),
				},
				lastPrice: {
					value: '0',
					bn: new BigNumber(0),
				},
				lowPrice: {
					value: '0',
					bn: new BigNumber(0),
				},
				highPrice: {
					value: '0',
					bn: new BigNumber(0),
				},
			},
		};
	}

	// Setup
	const { raw, footprint, candleStick } = footprintUpdates[currentTime];
	const { totals } = footprint;

	if (!footprint[price]) {
		footprint[price] = {
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
	}

	// Set Low Pice
	const hasLowestPriceBeenSet = candleStick.lowPrice.value.length !== "0";
	
	if (!hasLowestPriceBeenSet) {
		candleStick.lowPrice.bn = priceBN;
		candleStick.lowPrice.value = candleStick.lowPrice.bn;
	}

	const isFirstPrice = candleStick.firstPrice.value === "0";
	const isLowestPrice = candleStick.lowPrice.bn.comparedTo(priceBN) === 1;
	const isHighestPrice = candleStick.highPrice.bn.comparedTo(priceBN) === -1;

	if (isFirstPrice) {
		candleStick.firstPrice.bn = priceBN;
		candleStick.firstPrice.value = candleStick.firstPrice.bn.toString();
	}

	if (isLowestPrice) {
		candleStick.lowPrice.bn = priceBN;
		candleStick.lowPrice.value = candleStick.lowPrice.bn;
	}

	if (isHighestPrice) {
		candleStick.highPrice.bn = priceBN;
		candleStick.highPrice.value = candleStick.highPrice.bn;
	}

	// Update Sells
	if (side === Side.Sell) {
		// Price Specific
		const currentPrice = footprint[price];

		currentPrice.sellVolume.bn = currentPrice.sellVolume.bn.plus(sizeBN);
		currentPrice.sellVolume.value = currentPrice.sellVolume.bn.toString();

		currentPrice.totalVolume.bn = currentPrice.totalVolume.bn.plus(sizeBN);
		currentPrice.totalVolume.value = currentPrice.totalVolume.bn.toString();

		// Totals
		totals.sellVolume.bn = totals.sellVolume.bn.plus(sizeBN);
		totals.sellVolume.value = totals.sellVolume.bn.toString();

		totals.totalVolume.bn = totals.totalVolume.bn.plus(sizeBN);
		totals.totalVolume.value = totals.totalVolume.bn.toString();

		// Caputuring raw loogs
		raw.sells.push(data);
	}

	// Update Buys
	if (side === Side.Buy) {
		// Price specifc
		const currentPrice = footprint[price];

		currentPrice.buyVolume.bn = currentPrice.buyVolume.bn.plus(sizeBN);
		currentPrice.buyVolume.value = currentPrice.buyVolume.bn.toString();

		currentPrice.totalVolume.bn = currentPrice.totalVolume.bn.plus(sizeBN);
		currentPrice.totalVolume.value = currentPrice.totalVolume.bn.toString();

		// Totals
		totals.buyVolume.bn = totals.buyVolume.bn.plus(sizeBN);
		totals.buyVolume.value = totals.buyVolume.bn.toString();

		totals.totalVolume.bn = totals.totalVolume.bn.plus(sizeBN);
		totals.totalVolume.value = totals.totalVolume.bn.toString();

		// Caputuring raw loogs
		raw.buys.push(data);
	}

	// Items to always update
	totals.deltaVolume.bn = totals.buyVolume.bn.minus(totals.sellVolume.bn);
	totals.deltaVolume.value = totals.deltaVolume.bn.toString();

	candleStick.lastPrice.bn = priceBN;
	candleStick.lastPrice.value = candleStick.lastPrice.bn.toString();
};

export default addFootPrintUpdate;
