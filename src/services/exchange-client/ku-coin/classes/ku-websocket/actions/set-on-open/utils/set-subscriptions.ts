import WebSocket from 'ws';
import { Symbol } from '../../../../../enums';
import KuWebSocketMessage from '../../../../ku-websocket-message';

interface ISetSubscriptionsOptions {
	symbol: Symbol;
	webSocket: WebSocket;
	kuWebSocketMessage: KuWebSocketMessage;
}

const setSubscriptions = ({
	symbol,
	webSocket,
	kuWebSocketMessage,
}: ISetSubscriptionsOptions) => {
	webSocket.send(
		kuWebSocketMessage.subscribeToOrderBook({
			symbol,
		}),
	);
};

export default setSubscriptions;
