import KuFile from '../ku-file';
import { updateTickData } from './actions';
import { Topic, Symbol, Channel } from '../../enums';

interface IAddSequenceOptions {
	message: string;
}

interface IUpdateFootprintOptions {
	message: string;
	tickData?: {};
}

// This should be an independant TickData Module, updated with only the data it needs.. 
// All KuCoin messages should be parsed and outputs made available for TickData
class TickData {
	file: KuFile;
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
	messages: string[] = [];
	tickData: any = {}; // Should be an array? Best

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

	updateTickData = ({ message, tickData }: IUpdateFootprintOptions) => {
		updateTickData({
			message,
			tickData: tickData || this.tickData,
		});
	};

	addMessage = ({ message }: IAddSequenceOptions) => {
		this.messages.push(message);
	};

	getTickData = () => {
		return this.tickData;
	};

	getTickDataJson = (): string => {
		return JSON.stringify(this.tickData);
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
		const allUpdates = this.getTickDataJson();

		this.file.save({
			fileName,
			data: allUpdates,
		});
	};
}

export default TickData;
