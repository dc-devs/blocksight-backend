import { updateTickData } from './actions';

interface IUpdateFootprintOptions {
	message: string;
	tickData?: {};
}

// This should be an independant TickData Module, updated with only the data it needs..
// All KuCoin messages should be parsed and outputs made available for TickData
class TickData {
	symbol: Symbol;
	exchange: string;
	executions: any[] = [];
	tickData: any = {}; // Should be an array? Best

	constructor({ symbol, exchange }) {
		this.symbol = symbol;
		this.exchange = exchange;
	}

	updateTickData = ({ message, tickData }: IUpdateFootprintOptions) => {
		updateTickData({
			message,
			tickData: tickData || this.tickData,
		});
	};

	getTickData = () => {
		return this.tickData;
	};

	getTickDataJson = (): string => {
		return JSON.stringify(this.tickData);
	};

	getAllExecutions = (): string[] => {
		return this.executions;
	};

	getAllExecutionsJson = (): string => {
		return JSON.stringify(this.executions);
	};
}

export default TickData;
