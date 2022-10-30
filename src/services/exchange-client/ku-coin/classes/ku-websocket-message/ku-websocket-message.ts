import { Topic, Symbol, Channel } from '../../enums';
import { generateSubscriptionMessage, generatePingMessage } from './utils';

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

	generateOrderBookSubscriptionMessage = ({
		symbol,
	}: ISubscribeToOrderBookOptions) => {
		return generateSubscriptionMessage({
			symbol,
			topic: Topic.Level2,
			channel: Channel.Market,
			connectId: this.connectId,
		});
	};

	generatePingMessage = () => {
		return generatePingMessage({ connectId: this.connectId });
	};
}

export default KuWebSocketMessage;
