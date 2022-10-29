interface ISequence {
	type: string;
	price: string;
	size: string;
	time: number;
}

interface IOrderbookUpdates {
	sequence?: ISequence;
}

export default IOrderbookUpdates;
