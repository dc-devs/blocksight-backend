import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Symbol } from '../../enums';
import OrderBook from '../order-book';
import Logger from '../../../../../utils/logger';
import { getWebsocketConnectData } from './utils';
import WebSocketMessage from '../websocket-message';
import { setOnOpen, setOnClose, setOnError, setOnMessage } from './actions';

interface IOrderBookOptions {
	symbol: Symbol;
}

interface IInitOptions {
	webSocketTimeOut?: number;
	subscribeToOrderBook: IOrderBookOptions;
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

		setOnOpen({
			logger,
			symbol,
			webSocket,
			pingInterval,
			webSocketMessage,
			webSocketTimeOut,
		});
		setOnMessage({
			logger,
			webSocket,
			orderBook,
		});
		setOnClose({ logger, webSocket, orderBook });
		setOnError({ logger, webSocket });
	};
}

export default KuWebsocket;
