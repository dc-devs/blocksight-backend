import WebSocket from 'ws';
import WebSocketMessage from '../../../../websocket-message';

interface ISetPingIntervalOptions {
	pingInterval: number;
	webSocket: WebSocket;
	webSocketMessage: WebSocketMessage;
}

const setPingInterval = ({
	webSocket,
	webSocketMessage,
	pingInterval,
}: ISetPingIntervalOptions) => {
	setInterval(() => {
		webSocket.send(webSocketMessage.ping());
	}, pingInterval);
};

export default setPingInterval;
