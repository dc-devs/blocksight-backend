import WebSocket from 'ws';
import KuWebSocketMessage from '../../../../ku-websocket-message';

interface ISetPingIntervalOptions {
	pingInterval: number;
	webSocket: WebSocket;
	kuWebSocketMessage: KuWebSocketMessage;
}

const setPingInterval = ({
	webSocket,
	kuWebSocketMessage,
	pingInterval,
}: ISetPingIntervalOptions) => {
	setInterval(() => {
		webSocket.send(kuWebSocketMessage.ping());
	}, pingInterval);
};

export default setPingInterval;
