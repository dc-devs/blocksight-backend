import WebSocket from 'ws';
import KuWebSocketMessage from '../../../../ku-websocket-message';

interface ISetPingIntervalOptions {
	pingInterval: number;
	kuWebSocket: WebSocket;
	kuWebSocketMessage: KuWebSocketMessage;
}

const setPingInterval = ({
	kuWebSocket,
	kuWebSocketMessage,
	pingInterval,
}: ISetPingIntervalOptions) => {
	setInterval(() => {
		const pingMessage = kuWebSocketMessage.generatePingMessage();
		
		kuWebSocket.send(pingMessage);
	}, pingInterval);
};

export default setPingInterval;
