import WebSocket from 'ws';
import KuOrderBook from '../../ku-order-book';
import Logger from '../../../../../../utils/logger';

interface IOnCloseOptions {
	orderBook: KuOrderBook;
	webSocket: WebSocket;
	logger: typeof Logger;
}

export default IOnCloseOptions;