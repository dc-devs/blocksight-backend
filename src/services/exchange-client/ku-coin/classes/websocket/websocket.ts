import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
// import { Symbol } from '../../enums';
// import OrderBook from '../order-book';
import Logger from '../../../../../utils/logger';
import { getWebsocketConnectData } from './utils';
import WebSocketMessage from '../websocket-message';

// interface ISubscribeToOrderBookOptions {
// 	symbol: Symbol;
// }

interface IInitOptions {
	webSocketTimeOut?: number;
}

interface ISetOnOpenOptions {
	pingInterval: number;
	webSocket: WebSocket;
	logger: typeof Logger;
	webSocketTimeOut?: number;
	webSocketMessage: WebSocketMessage;
}

interface ISetOnMessageOptions {
	webSocket: WebSocket;
}

interface ISetOnCloseOptions {
	webSocket: WebSocket;
	logger: typeof Logger;
}

interface ISetOnErrorOptions {
	webSocket: WebSocket;
	logger: typeof Logger;
}

class KuWebsocket {
	// connectId: string;
	// pingInterval: number;
	// orderBook: OrderBook;
	// webSocket: WebSocket;
	// webSocketMessage: WebSocketMessage;

	constructor() {}

	init = async ({ webSocketTimeOut }: IInitOptions) => {
		// const orderBook = new OrderBook();
		const logger = Logger;
		const connectId = uuidv4();
		const { connectionUrl, pingInterval } = await getWebsocketConnectData({
			connectId,
		});
		const webSocket = new WebSocket(connectionUrl);
		const webSocketMessage = new WebSocketMessage({
			connectId,
		});

		this.setOnOpen({
			logger,
			webSocket,
			pingInterval,
			webSocketMessage,
			webSocketTimeOut,
		});

		this.setOnMessage({
			webSocket,
		});

		this.setOnClose({ logger, webSocket });

		this.setOnError({ logger, webSocket });
	};

	setOnOpen = ({
		logger,
		webSocket,
		pingInterval,
		webSocketMessage,
		webSocketTimeOut,
	}: ISetOnOpenOptions) => {
		webSocket.onopen = () => {
			logger.debug('[KuCoin WebSocket] Connection established');

			setInterval(() => {
				webSocket.send(webSocketMessage.ping());
			}, pingInterval);

			if (webSocketTimeOut) {
				setTimeout(() => {
					webSocket.close();
				}, webSocketTimeOut);
			}
		};
	};

	setOnMessage = ({ webSocket }: ISetOnMessageOptions) => {
		webSocket.onmessage = (event) => {
			const message = event.data;

			if (typeof message === 'string') {
				if (message.includes('"id"')) {
					Logger.debug('[KuCoin WebSocket] Message:', message);
				}

				if (message.includes('error')) {
					webSocket.close();
				}

				// if (message.includes('bid')) {
				// 	this.orderBook.addMessage({
				// 		message,
				// 	});
				// }
			}
		};
	};

	setOnClose = ({ logger, webSocket }: ISetOnCloseOptions) => {
		webSocket.onclose = (event) => {
			if (event.wasClean) {
				logger.debug(
					`[KuCoin WebSocket] Connection closed cleanly: code=${event.code}`,
				);

				// this.orderBook.saveAllMessagesToFile();
				// this.orderBook.saveAllUpdatesToFile();
			} else {
				// Server process killed or network down
				// event.code is usually 1006 in this case
				// TODO: If connection dies probs need some type of alert
				logger.error('[KuCoin WebSocket] Connection died', event.code);
			}
		};
	};

	setOnError = ({ logger, webSocket }: ISetOnErrorOptions) => {
		webSocket.onerror = (error) => {
			logger.error(`'[KuCoin WebSocket] Connection error:`, error);
			webSocket.close();
		};
	};

	// subscribeToOrderBook = ({ symbol }: ISubscribeToOrderBookOptions) => {
	// 	this.webSocket.send(
	// 		this.webSocketMessage.subscribeToOrderBook({
	// 			symbol,
	// 		}),
	// 	);
	// };
}

export default KuWebsocket;
