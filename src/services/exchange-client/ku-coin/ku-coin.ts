import WebSocket from 'ws';
import { Symbol } from './enums';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../../utils/logger';
import { getWebsocketConnectData } from './utils';
import { OrderBook, WebSocketMessage } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		// Global Vars
		const connectId = uuidv4();
		const orderBook = new OrderBook();
		const webSocketMessage = new WebSocketMessage({ connectId });
		const { connectionUrl, pingInterval } = await getWebsocketConnectData({
			connectId,
		});

		var ws = new WebSocket(connectionUrl);

		ws.onopen = () => {
			Logger.debug('[KuCoin WebSocket] Connection established');

			ws.send(webSocketMessage.ping());
			ws.send(
				webSocketMessage.subscribeToOrderBook({
					symbol: Symbol.MATIC_USDT,
				}),
			);

			setTimeout(() => {
				ws.close();
			}, 5000);

			setInterval(async () => {
				ws.send(webSocketMessage.ping());
			}, pingInterval);
		};

		ws.onmessage = (event) => {
			const message = event.data;

			if (typeof message === 'string') {
				if (message.includes('"id"')) {
					Logger.debug('[KuCoin WebSocket] Message:', message);
				}

				if (message.includes('error')) {
					ws.close();
				}

				if (message.includes('bid')) {
					orderBook.addMessage({
						message,
					});
				}
			}
		};

		ws.onclose = (event) => {
			if (event.wasClean) {
				Logger.debug(
					`[KuCoin WebSocket] Connection closed cleanly: code=${event.code}`,
				);

				orderBook.saveAllMessagesToFile();
				orderBook.saveAllUpdatesToFile();
			} else {
				// Server process killed or network down
				// event.code is usually 1006 in this case
				// TODO: If connection dies probs need some type of alert
				Logger.error('[KuCoin WebSocket] Connection died', event.code);
			}
		};

		ws.onerror = (error) => {
			console.log(`[error]`, error);
			ws.close();
		};
	};
}

export default KuCoin;
