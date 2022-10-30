import WebSocket from 'ws';
import ISubcriptions from './i-subscriptions';
import Logger from '../../../../../../utils/logger';
import KuWebSocketMessage from '../../ku-websocket-message';

interface IOnOpenOptions {
	pingInterval: number;
	webSocket: WebSocket;
	logger: typeof Logger;
	webSocketTimeOut?: number;
	subscriptions: ISubcriptions;
	kuWebSocketMessage: KuWebSocketMessage;
}

export default IOnOpenOptions;
