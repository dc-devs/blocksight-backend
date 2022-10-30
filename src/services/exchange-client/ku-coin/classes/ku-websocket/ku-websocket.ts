import { Symbol } from '../../enums';
import KuOrderBook from '../ku-order-book';
import Logger from '../../../../../utils/logger';
import KuWebSocketMessage from '../ku-websocket-message';
import {
	setOnOpen,
	setOnClose,
	setOnError,
	setOnMessage,
	connectToWebSocket,
} from './actions';

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
		const { symbol } = subscribeToOrderBook;
		const orderBook = new KuOrderBook();
		const { webSocket, pingInterval, connectId } =
			await connectToWebSocket();
		const kuWebSocketMessage = new KuWebSocketMessage({
			connectId,
		});

		setOnOpen({
			logger,
			symbol, // Should be some type of 'subscriptions' prop..
			webSocket,
			pingInterval,
			kuWebSocketMessage,
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
