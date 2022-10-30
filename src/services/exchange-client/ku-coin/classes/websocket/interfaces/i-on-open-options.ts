import WebSocket from 'ws';
// import OrderBook from '../../order-book';
import Symbol from '../../../enums/symbol';
import Logger from '../../../../../../utils/logger';
import WebSocketMessage from '../../websocket-message';

interface IOnOpenOptions {
	symbol: Symbol;
	// orderBook: OrderBook;
	pingInterval: number;
	webSocket: WebSocket;
	logger: typeof Logger;
	webSocketTimeOut?: number;
	webSocketMessage: WebSocketMessage;
}

export default IOnOpenOptions;
