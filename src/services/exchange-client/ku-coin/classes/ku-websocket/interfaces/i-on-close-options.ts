import WebSocket from 'ws';
import KuFootprint from '../../ku-footprint';
import KuOrderBook from '../../ku-order-book';
import Logger from '../../../../../../utils/logger';

interface IOnCloseOptions {
	orderBook: KuOrderBook;
	footprint: KuFootprint;
	kuWebSocket: WebSocket;
	logger: typeof Logger;
}

export default IOnCloseOptions;
