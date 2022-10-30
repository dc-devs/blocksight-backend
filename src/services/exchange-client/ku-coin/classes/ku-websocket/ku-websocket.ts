import KuOrderBook from '../ku-order-book';
import { ISubcriptions } from './interfaces';
import Logger from '../../../../../utils/logger';
import KuWebSocketMessage from '../ku-websocket-message';
import {
	setOnOpen,
	setOnClose,
	setOnError,
	setOnMessage,
	connectToWebSocket,
} from './actions';

interface IInitOptions {
	webSocketTimeOut?: number;
	subscriptions: ISubcriptions;
}

class KuWebsocket {
	constructor() {}

	init = async ({ webSocketTimeOut, subscriptions }: IInitOptions) => {
		const logger = Logger;
		const orderBook = new KuOrderBook();
		const { webSocket, pingInterval, connectId } =
			await connectToWebSocket();
		const kuWebSocketMessage = new KuWebSocketMessage({
			connectId,
		});

		setOnOpen({
			logger,
			webSocket,
			pingInterval,
			subscriptions,
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
