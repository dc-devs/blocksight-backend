import WebSocket from 'ws';
import KuOrderBook from '../../ku-order-book';
import Logger from '../../../../../../utils/logger';

interface IOnMessageOptions {
	kuWebSocket: WebSocket;
	orderBook: KuOrderBook;
	logger: typeof Logger;
}

export default IOnMessageOptions;
