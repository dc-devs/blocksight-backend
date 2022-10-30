import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { authenticateWebSocketConnection } from './utils';

const connectToWebSocket = async () => {
	const connectId = uuidv4();
	const { connectionUrl, pingInterval } =
		await authenticateWebSocketConnection({
			connectId,
		});
	const webSocket = new WebSocket(connectionUrl);

	return {
		connectId,
		webSocket,
		pingInterval,
	};
};

export default connectToWebSocket;
