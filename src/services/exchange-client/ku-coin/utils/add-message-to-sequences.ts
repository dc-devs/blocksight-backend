// [0] Price
// [1] Size
// [2] Sequence
interface ILevel2Changes {
	asks: string[][];
	bids: string[][];
}

interface ILevel2Data {
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
	data: ILevel2Data;
}

interface IOptions {
	sequences: {};
	message: string;
}

const addMessageToSequences = ({ sequences, message }: IOptions) => {
	const parsedMessage: ILevel2Message = JSON.parse(message);
	const { data } = parsedMessage;
	const { time, changes } = data;
	const { asks: sellOrders, bids: buyOrders } = changes;

	sellOrders.forEach((sellOrder) => {
		const price = sellOrder[0];
		const size = sellOrder[1];
		const sequence = sellOrder[2];

		if (!sequences[time]) {
			sequences[time] = {};
		}

		if (!sequences[time][sequence]) {
			sequences[time][sequence] = {
				buyOrders: [],
				sellOrders: [],
			};
		}

		sequences[time][sequence].sellOrders.push({
			price,
			size,
		});
	});

	buyOrders.forEach((buyOrder) => {
		const price = buyOrder[0];
		const size = buyOrder[1];
		const sequence = buyOrder[2];

		if (!sequences[time]) {
			sequences[time] = {};
		}

		if (!sequences[time][sequence]) {
			sequences[time][sequence] = {
				buyOrders: [],
				sellOrders: [],
			};
		}

		sequences[time][sequence].buyOrders.push({
			price,
			size,
		});
	});
};

export default addMessageToSequences;
