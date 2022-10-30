import WebSocket from 'ws';
import OrderBook from '../../order-book';
import Logger from '../../../../../../utils/logger';

interface IOnMessageOptions {
	webSocket: WebSocket;
	orderBook: OrderBook;
	logger: typeof Logger;
}

export default IOnMessageOptions;
