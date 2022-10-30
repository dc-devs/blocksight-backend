import { Message } from '../../enums';
import { IOnOpenOptions } from '../../interfaces';
import {
	setPingInterval,
	setSubscriptions,
	setWebSocketTimeOut,
} from './utils';

const setOnOpen = ({
	logger,
	symbol,
	webSocket,
	pingInterval,
	webSocketMessage,
	webSocketTimeOut,
}: IOnOpenOptions) => {
	webSocket.onopen = () => {
		logger.debug(Message.ConnectionEstablished);
		setPingInterval({ webSocket, webSocketMessage, pingInterval });
		setWebSocketTimeOut({ webSocket, webSocketTimeOut });
		setSubscriptions({ webSocket, webSocketMessage, symbol });
	};
};

export default setOnOpen;
