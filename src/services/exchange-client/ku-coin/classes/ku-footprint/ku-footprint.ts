import KuFile from '../ku-file';
import { addFootprintUpdate } from './actions';
// import { IFootPrintUpdates } from './interfaces';
import { Topic, Symbol, Channel } from '../../enums';

interface IAddSequenceOptions {
	message: string;
}

class KuFootprint {
	file: KuFile;
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
	messages: string[] = [];
	footprintUpdates: any = {};

	constructor() {
		this.topic = Topic.Match;
		this.symbol = Symbol.MATIC_USDT;
		this.channel = Channel.Market;

		this.file = new KuFile({
			topic: this.topic,
			symbol: this.symbol,
			channel: this.channel,
		});
	}

	addMessage = ({ message }: IAddSequenceOptions) => {
		this.messages.push(message);

		addFootprintUpdate({
			message,
			footprintUpdates: this.footprintUpdates,
		});
	};

	// getAllUpdates = (): IFootPrintUpdates => {
	getAllUpdates = () => {
		return this.footprintUpdates;
	};

	getAllUpdatesJson = (): string => {
		return JSON.stringify(this.footprintUpdates);
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

export default KuFootprint;
