import { addOrderBookUpdate } from './utils';
import { IOrderbookUpdates } from './interfaces';

interface IAddSequenceOptions {
	message: string;
}

class Level2Data {
	messages: string[] = [];
	orderBookUpdates: IOrderbookUpdates = {};

	constructor() {}

	addMessage = ({ message }: IAddSequenceOptions) => {
		this.messages.push(message);

		addOrderBookUpdate({
			message,
			orderBookUpdates: this.orderBookUpdates,
		});
	};

	getOrderBookUpdates = (): IOrderbookUpdates => {
		return this.orderBookUpdates;
	};

	getOrderBookUpdatesAsJson = (): string => {
		return JSON.stringify(this.orderBookUpdates);
	};

	getMessages = (): string[] => {
		return this.messages;
	};

	getMessagesAsJson = (): string => {
		return JSON.stringify(this.messages);
	};
}

export default Level2Data;
