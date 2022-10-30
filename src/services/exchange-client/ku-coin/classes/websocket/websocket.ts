import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Symbol } from '../../enums';
import OrderBook from '../order-book';
import Logger from '../../../../../utils/logger';
import { getWebsocketConnectData } from './utils';
import WebSocketMessage from '../websocket-message';

interface IOrderBookOptions {
	symbol: Symbol;
}

interface IInitOptions {
	webSocketTimeOut?: number;
	subscribeToOrderBook: IOrderBookOptions;
}

interface ISetOnOpenOptions {
	symbol: Symbol;
	orderBook: OrderBook;
	pingInterval: number;
	webSocket: WebSocket;
	logger: typeof Logger;
	webSocketTimeOut?: number;
	webSocketMessage: WebSocketMessage;
}

interface ISetOnMessageOptions {
	webSocket: WebSocket;
	orderBook: OrderBook;
}

interface ISetOnCloseOptions {
	orderBook: OrderBook;
	webSocket: WebSocket;
	logger: typeof Logger;
}

interface ISetOnErrorOptions {
	webSocket: WebSocket;
	logger: typeof Logger;
}

class KuWebsocket {
	constructor() {}

	init = async ({ webSocketTimeOut, subscribeToOrderBook }: IInitOptions) => {
		const logger = Logger;
		const connectId = uuidv4();
		const { symbol } = subscribeToOrderBook;
		const orderBook = new OrderBook();

		const { connectionUrl, pingInterval } = await getWebsocketConnectData({
			connectId,
		});
		const webSocket = new WebSocket(connectionUrl);
		const webSocketMessage = new WebSocketMessage({
			connectId,
		});

		this.setOnOpen({
			logger,
			symbol,
			orderBook,
			webSocket,
			pingInterval,
			webSocketMessage,
			webSocketTimeOut,
		});

		this.setOnMessage({
			webSocket,
			orderBook,
		});

		this.setOnClose({ logger, webSocket, orderBook });

		this.setOnError({ logger, webSocket });
	};

	setOnOpen = ({
		logger,
		symbol,
		webSocket,
		pingInterval,
		webSocketMessage,
		webSocketTimeOut,
	}: ISetOnOpenOptions) => {
		webSocket.onopen = () => {
			logger.debug('[KuCoin WebSocket] Connection established');

			// Set Interval Ping - Keep connection alive
			setInterval(() => {
				webSocket.send(webSocketMessage.ping());
			}, pingInterval);

			// Set Websocket Timeout
			if (webSocketTimeOut) {
				setTimeout(() => {
					webSocket.close();
				}, webSocketTimeOut);
			}

			// Set Subscriptions
			webSocket.send(
				webSocketMessage.subscribeToOrderBook({
					symbol,
				}),
			);
		};
	};

	setOnMessage = ({ webSocket, orderBook }: ISetOnMessageOptions) => {
		webSocket.onmessage = (event) => {
			const message = event.data;

			if (typeof message === 'string') {
				if (message.includes('"id"')) {
					Logger.debug('[KuCoin WebSocket] Message:', message);
				}

				if (message.includes('error')) {
					webSocket.close();
				}

				if (message.includes('bid')) {
					if (orderBook) {
						orderBook.addMessage({
							message,
						});
					}
				}
			}
		};
	};

	setOnClose = ({ logger, webSocket, orderBook }: ISetOnCloseOptions) => {
		webSocket.onclose = (event) => {
			if (event.wasClean) {
				logger.debug(
					`[KuCoin WebSocket] Connection closed cleanly: code=${event.code}`,
				);

				if (orderBook) {
					orderBook.saveAllMessagesToFile();
					orderBook.saveAllUpdatesToFile();
				}
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
}

export default KuWebsocket;
