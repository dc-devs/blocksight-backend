import WebSocket from 'ws';
import KuFootprint from '../../../../../tick-data';
import KuOrderBook from '../../ku-order-book';
import Logger from '../../../../../../utils/logger';

interface IOnMessageOptions {
	kuWebSocket: WebSocket;
	footprint: KuFootprint;
	orderBook: KuOrderBook;
	logger: typeof Logger;
}

export default IOnMessageOptions;
