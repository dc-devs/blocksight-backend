import WebSocket from 'ws';
import OrderBook from '../../order-book';
import Logger from '../../../../../../utils/logger';

interface IOnCloseOptions {
	orderBook: OrderBook;
	webSocket: WebSocket;
	logger: typeof Logger;
}

export default IOnCloseOptions;
