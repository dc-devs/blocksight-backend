import CovalentLogEvent from '../../../../../interfaces/covalent-log-event-interface';
import LogEvent from '../../../../../interfaces/log-event-interface';
import getUniswapV2InputOutputAmounts from '../../../../../transactions/utils/parse-transactions/covalent/uniswap-v2/get-uniswap-v2-input-output-amounts';

// lEFT OFF
// Get this function working
// Check how many uniswapv2 have multiple swap events,
// possibly getting first swap won't work
// get these to display in ui
// start to add up totals
// start to show number of transactions actually
const parseUniswapV2LogEvents = (logEvents: CovalentLogEvent[]): LogEvent => {
	const { inputTokenAmount, outputTokenAmount } =
		getUniswapV2InputOutputAmounts(logEvents);

	return { inputTokenAmount, outputTokenAmount };
};

export default parseUniswapV2LogEvents;
