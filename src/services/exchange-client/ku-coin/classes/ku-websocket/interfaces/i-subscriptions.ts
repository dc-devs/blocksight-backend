import { Symbol } from '../../../enums';

interface IOrderBookOptions {
	symbol: Symbol;
}

interface IMatchExecutionOptions {
	symbol: Symbol;
}

interface ISubcriptions {
	orderBook: IOrderBookOptions;
	matchExecution: IMatchExecutionOptions;
}

export default ISubcriptions;
