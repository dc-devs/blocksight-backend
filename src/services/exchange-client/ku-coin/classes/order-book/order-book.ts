import File from '../file';
import { addOrderBookUpdate } from './utils';
import { IOrderbookUpdates } from './interfaces';
import { Topic, Symbol, Channel } from '../../enums';

interface IAddSequenceOptions {
	message: string;
}

class OrderBook {
	file: File;
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
	messages: string[] = [];
	orderBookUpdates: IOrderbookUpdates = {};

	constructor() {
		this.topic = Topic.Level2;
		this.symbol = Symbol.MATIC_USDT;
		this.channel = Channel.Market;

		this.file = new File({
			topic: this.topic,
			symbol: this.symbol,
			channel: this.channel,
		});
	}

	addMessage = ({ message }: IAddSequenceOptions) => {
		this.messages.push(message);

		addOrderBookUpdate({
			message,
			orderBookUpdates: this.orderBookUpdates,
		});
	};

	getAllUpdates = (): IOrderbookUpdates => {
		return this.orderBookUpdates;
	};

	getAllUpdatesJson = (): string => {
		return JSON.stringify(this.orderBookUpdates);
	};

	getAllMessages = (): string[] => {
		return this.messages;
	};

	getAllMessagesJson = (): string => {
		return JSON.stringify(this.messages);
	};

	saveAllMessagesToFile = () => {
		const fileName = 'all-messages';
		const messages = this.getAllMessagesJson();

		this.file.save({
			fileName,
			data: messages,
		});
	};

	saveAllUpdatesToFile = () => {
		const fileName = 'all-updates';
		const allUpdates = this.getAllUpdatesJson();

		this.file.save({
			fileName,
			data: allUpdates,
		});
	};
}

export default OrderBook;
