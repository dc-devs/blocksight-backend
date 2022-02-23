import parseUniswapV2EventLogs from '../transactions/utils/parse-transactions/covalent/uniswap-v2/parse-uniswap-v2-log-events';

const contractAddressParseEventLogsMap = {
	'0x7a250d5630b4cf539739df2c5dacb4c659f2488d': parseUniswapV2EventLogs,
};

export default contractAddressParseEventLogsMap;
