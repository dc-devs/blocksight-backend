import { ILevel2Message, IOrderbookUpdates } from '../interfaces';

enum OrderBookType {
	Asks = 'asks',
	Bids = 'bids',
}

interface IOptions {
	orderBookUpdates: IOrderbookUpdates;
	message: string;
}

const addOrderBookUpdate = ({ orderBookUpdates, message }: IOptions) => {
	const parsedMessage: ILevel2Message = JSON.parse(message);
	const { data } = parsedMessage;
	const { time, changes } = data;
	const { asks, bids } = changes;

	asks.forEach((ask) => {
		const price = ask[0];
		const size = ask[1];
		const sequence = ask[2];

		if (!orderBookUpdates[sequence]) {
			orderBookUpdates[sequence] = {
				type: OrderBookType.Asks,
				price,
				size,
				time,
			};
		} else {
			console.error('Duplicate Sequence!!');
		}
	});

	bids.forEach((bid) => {
		const price = bid[0];
		const size = bid[1];
		const sequence = bid[2];

		if (!orderBookUpdates[sequence]) {
			orderBookUpdates[sequence] = {
				type: OrderBookType.Bids,
				price,
				size,
				time,
			};
		} else {
			console.error('Duplicate Sequence!!');
		}
	});
};

export default addOrderBookUpdate;
