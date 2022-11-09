import KuFootprint from '../../../../tick-data';
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
		// TODO: eventually pull out as these shoould be inited once
		// make on message externally availble ?
		const orderBook = new KuOrderBook();
		const footprint = new KuFootprint();
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
			footprint,
			orderBook,
			kuWebSocket,
		});

		setOnError({ logger, kuWebSocket });

		setOnClose({ logger, kuWebSocket, orderBook, footprint });
	};
}

export default KuWebsocket;
