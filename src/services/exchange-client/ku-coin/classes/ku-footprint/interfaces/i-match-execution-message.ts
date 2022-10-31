interface IFootprint {
	makerOrderId: string;
	price: string;
	sequence: string;
	side: string;
	size: string;
	symbol: string;
	takerOrderId: string;
	time: string;
	tradeId: string;
	type: string;
	timestamp?: number;
}

interface IMatchExecutionMessage {
	type: string;
	topic: string;
	subject: string;
	data: IFootprint;
}

export default IMatchExecutionMessage;
