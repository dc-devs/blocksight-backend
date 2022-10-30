import WebSocket from 'ws';
import Symbol from '../../../enums/symbol';
import Logger from '../../../../../../utils/logger';
import KuWebSocketMessage from '../../ku-websocket-message';

interface IOnOpenOptions {
	symbol: Symbol;
	pingInterval: number;
	webSocket: WebSocket;
	logger: typeof Logger;
	webSocketTimeOut?: number;
	kuWebSocketMessage: KuWebSocketMessage;
}

export default IOnOpenOptions;
