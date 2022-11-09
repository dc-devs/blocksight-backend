interface IData {
	makerOrderId: string;
	price: string;
	sequence: string;
	side: string;
	size: string;
	symbol: string;
	takerOrderId: string;
	time: string; // timestamp nanoseconds
	tradeId: string;
	type: string;
}

interface IMatchExecutionMessage {
	type: string;
	topic: string;
	subject: string;
	data: IData;
}

export default IMatchExecutionMessage;
