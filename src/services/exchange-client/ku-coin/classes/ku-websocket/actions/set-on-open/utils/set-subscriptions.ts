import WebSocket from 'ws';
import { ISubcriptions } from '../../../interfaces';
import KuWebSocketMessage from '../../../../ku-websocket-message';

interface ISetSubscriptionsOptions {
	webSocket: WebSocket;
	subscriptions: ISubcriptions;
	kuWebSocketMessage: KuWebSocketMessage;
}

const setSubscriptions = ({
	webSocket,
	subscriptions,
	kuWebSocketMessage,
}: ISetSubscriptionsOptions) => {
	// const {orderBook, matchExecution} = subscriptions
	const {orderBook} = subscriptions

	if (orderBook.symbol) {
		webSocket.send(
			kuWebSocketMessage.subscribeToOrderBook({
				symbol: orderBook.symbol,
			}),
		);
	}
	
	// if (matchExecution.symbol) {
	// 	webSocket.send(
	// 		kuWebSocketMessage.subscribeToMatchExecution({
	// 			symbol: matchExecution.symbol,
	// 		}),
	// 	);
	// }
};

export default setSubscriptions;
