import WebSocket from 'ws';
import { ISubcriptions } from '../../../interfaces';
import KuWebSocketMessage from '../../../../ku-websocket-message';

interface ISetSubscriptionsOptions {
	kuWebSocket: WebSocket;
	subscriptions: ISubcriptions;
	kuWebSocketMessage: KuWebSocketMessage;
}

const setSubscriptions = ({
	kuWebSocket,
	subscriptions,
	kuWebSocketMessage,
}: ISetSubscriptionsOptions) => {
	// const {orderBook, matchExecution} = subscriptions
	const { orderBook } = subscriptions;

	if (orderBook.symbol) {
		const orderBookSubscriptionMessage =
			kuWebSocketMessage.generateOrderBookSubscriptionMessage({
				symbol: orderBook.symbol,
			});

		kuWebSocket.send(orderBookSubscriptionMessage);
	}

	// if (matchExecution.symbol) {
	// 	kuWebSocket.send(
	// 		kuWebSocketMessage.subscribeToMatchExecution({
	// 			symbol: matchExecution.symbol,
	// 		}),
	// 	);
	// }
};

export default setSubscriptions;
