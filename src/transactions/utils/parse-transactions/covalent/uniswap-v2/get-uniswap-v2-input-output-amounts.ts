import { BigNumber } from 'bignumber.js';
import CovalentLogEvent from '../../../../../interfaces/covalent-log-event-interface';
import getDecodedLogEvent from '../utils/get-decoded-log-event';

const getUniswapV2InputOutputAmounts = (
	logEvents: CovalentLogEvent[]
): {
	inputTokenAmount: string;
	outputTokenAmount: string;
} => {
	const decodedSwapEvent = getDecodedLogEvent(logEvents, 'Swap');
	let inputTokenAmount = new BigNumber('0');
	let outputTokenAmount = new BigNumber('0');

	if (!decodedSwapEvent) {
		throw Error('No Swap Event Found');
	}

	decodedSwapEvent.params.forEach((param) => {
		const { name, value } = param;

		if (name === 'amount0In' || name === 'amount1In') {
			inputTokenAmount = BigNumber.sum(inputTokenAmount, value);
		}

		if (name === 'amount0Out' || name === 'amount1Out') {
			outputTokenAmount = BigNumber.sum(outputTokenAmount, value);
		}
	});

	return {
		inputTokenAmount: inputTokenAmount.toString(),
		outputTokenAmount: outputTokenAmount.toString(),
	};
};

export default getUniswapV2InputOutputAmounts;
