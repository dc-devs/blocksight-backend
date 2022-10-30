import { Topic, Symbol, Channel } from '../../enums';
import { getSubscriptionMessage, getPingMessage } from './utils';

interface ISubscribeToOrderBookOptions {
	symbol: Symbol;
}

interface IKuWebSocketMessageOptions {
	connectId: string;
}

class KuWebSocketMessage {
	connectId: string;

	constructor({ connectId }: IKuWebSocketMessageOptions) {
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

export default KuWebSocketMessage;
