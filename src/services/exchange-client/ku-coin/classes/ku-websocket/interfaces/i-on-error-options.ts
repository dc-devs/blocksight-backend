import WebSocket from 'ws';
import Logger from '../../../../../../utils/logger';

interface IOnErrorOptions {
	kuWebSocket: WebSocket;
	logger: typeof Logger;
}

export default IOnErrorOptions;
