import WebSocket from 'ws';
import Logger from '../../../../../../utils/logger';

interface IOnErrorOptions {
	webSocket: WebSocket;
	logger: typeof Logger;
}

export default IOnErrorOptions;
