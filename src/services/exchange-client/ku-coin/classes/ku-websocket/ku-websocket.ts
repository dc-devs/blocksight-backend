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
		const { kuWebSocket, pingInterval, connectId } =
			await connectToWebSocket();
		const kuWebSocketMessage = new KuWebSocketMessage({
			connectId,
		});

		setOnOpen({
			logger,
			kuWebSocket,
			pingInterval,
			subscriptions,
			kuWebSocketMessage,
			webSocketTimeOut,
		});
		setOnMessage({
			logger,
			kuWebSocket,
			orderBook,
		});
		setOnClose({ logger, kuWebSocket, orderBook });
		setOnError({ logger, kuWebSocket });
	};
}

export default KuWebsocket;
