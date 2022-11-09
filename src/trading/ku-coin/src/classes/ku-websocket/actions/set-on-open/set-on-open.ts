import { Message } from '../../enums';
import { IOnOpenOptions } from '../../interfaces';
import {
	setPingInterval,
	setSubscriptions,
	setWebSocketTimeOut,
} from './utils';

const setOnOpen = ({
	logger,
	kuWebSocket,
	subscriptions,
	pingInterval,
	kuWebSocketMessage,
	webSocketTimeOut,
}: IOnOpenOptions) => {
	kuWebSocket.onopen = () => {
		logger.debug(Message.ConnectionEstablished);
		setPingInterval({ kuWebSocket, kuWebSocketMessage, pingInterval });
		setWebSocketTimeOut({ kuWebSocket, webSocketTimeOut });
		setSubscriptions({ kuWebSocket, kuWebSocketMessage, subscriptions });
	};
};

export default setOnOpen;
