import { Message } from '../../enums';
import { IOnOpenOptions } from '../../interfaces';
import {
	setPingInterval,
	setSubscriptions,
	setWebSocketTimeOut,
} from './utils';

const setOnOpen = ({
	logger,
	webSocket,
	subscriptions,
	pingInterval,
	kuWebSocketMessage,
	webSocketTimeOut,
}: IOnOpenOptions) => {
	webSocket.onopen = () => {
		logger.debug(Message.ConnectionEstablished);
		setPingInterval({ webSocket, kuWebSocketMessage, pingInterval });
		setWebSocketTimeOut({ webSocket, webSocketTimeOut });
		setSubscriptions({ webSocket, kuWebSocketMessage, subscriptions });
	};
};

export default setOnOpen;
