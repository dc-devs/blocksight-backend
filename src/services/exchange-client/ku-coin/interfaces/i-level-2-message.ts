// [0] Price
// [1] Size
// [2] Sequence
interface ILevel2Changes {
	asks: string[][];
	bids: string[][];
}

interface IOrderBook {
	changes: ILevel2Changes;
	sequenceEnd: number;
	sequenceStart: number;
	symbol: string;
	time: number;
}

interface ILevel2Message {
	type: string;
	topic: string;
	subject: string;
	data: IOrderBook;
}

export default ILevel2Message;
