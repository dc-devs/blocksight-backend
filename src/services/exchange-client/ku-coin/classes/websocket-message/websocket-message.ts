import { Topic, Symbol, Channel } from '../../enums';
import { getSubscriptionMessage, getPingMessage } from './utils';

interface ISubscribeToOrderBookOptions {
	symbol: Symbol;
}

interface IWebSocketMessageOptions {
	connectId: string;
}

class WebSocketMessage {
	connectId: string;

	constructor({ connectId }: IWebSocketMessageOptions) {
		this.connectId = connectId;
	}

	subscribeToOrderBook = ({ symbol }: ISubscribeToOrderBookOptions) => {
		return getSubscriptionMessage({
			symbol,
			topic: Topic.Level2,
			channel: Channel.Market,
			connectId: this.connectId,
		});
	};

	ping = () => {
		return getPingMessage({ connectId: this.connectId });
	};
}

export default WebSocketMessage;
