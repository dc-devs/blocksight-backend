import WebSocket from 'ws';
import { Symbol } from '../../../../../enums';
import WebSocketMessage from '../../../../websocket-message';

interface ISetSubscriptionsOptions {
	symbol: Symbol;
	webSocket: WebSocket;
	webSocketMessage: WebSocketMessage;
}

const setSubscriptions = ({
	symbol,
	webSocket,
	webSocketMessage,
}: ISetSubscriptionsOptions) => {
	webSocket.send(
		webSocketMessage.subscribeToOrderBook({
			symbol,
		}),
	);
};

export default setSubscriptions;
