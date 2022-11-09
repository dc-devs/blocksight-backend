import BigNumber from 'bignumber.js';
import { IMatchExecutionMessage } from '../../interfaces';
import { convertNanoToMs, getFormattedTime } from './utils';

import { getDefaultTickData, getDefaultFoootprint } from './default-templates';

enum Side {
	Buy = 'buy',
	Sell = 'sell',
}

interface IOptions {
	tickData: any;
	price: string;
	size: string;
	side: string;
	timestamp: number;
}

const updateTickData = ({ tickData, price, size, side, timestamp }: IOptions) => {
	const currentTime = getFormattedTime({ timestamp });
	const sizeBN = new BigNumber(size);
	const priceBN = new BigNumber(price);

	let thisTickData = tickData[currentTime];

	// data.timestamp = timestamp;

	if (!thisTickData) {
		thisTickData = getDefaultTickData();
	}

	// Setup
	const { raw, footprint, candleStick } = thisTickData;
	const { totals } = footprint;

	if (!footprint[price]) {
		footprint[price] = getDefaultFoootprint();
	}

	// Function - updateCandleStick
	// ----------------------------------
	const hasLowestPriceBeenSet = candleStick.low.value.length !== '0';

	if (!hasLowestPriceBeenSet) {
		candleStick.low.bn = priceBN;
		candleStick.low.value = candleStick.low.bn;
	}

	const isFirstPrice = candleStick.open.value === '0';
	const isLowestPrice = candleStick.low.bn.comparedTo(priceBN) === 1;
	const isHighestPrice = candleStick.high.bn.comparedTo(priceBN) === -1;

	if (isFirstPrice) {
		candleStick.open.bn = priceBN;
		candleStick.open.value = candleStick.open.bn.toString();
	}

	if (isLowestPrice) {
		candleStick.low.bn = priceBN;
		candleStick.low.value = candleStick.low.bn;
	}

	if (isHighestPrice) {
		candleStick.high.bn = priceBN;
		candleStick.high.value = candleStick.high.bn;
	}

	candleStick.close.bn = priceBN;
	candleStick.close.value = candleStick.close.bn.toString();
	// ----------------------------------

	// Function - updateFootPrint
	// ----------------------------------

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

	// ----------------------------------
};

export default updateTickData;
