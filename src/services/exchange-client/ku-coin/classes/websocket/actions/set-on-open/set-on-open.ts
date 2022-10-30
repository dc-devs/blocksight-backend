import { Message } from '../../enums';
import { IOnOpenOptions } from '../../interfaces';

const setPingInterval = ({ webSocket, webSocketMessage, pingInterval }) => {
	setInterval(() => {
		webSocket.send(webSocketMessage.ping());
	}, pingInterval);
};

const setWebSocketTimeOut = ({ webSocket, webSocketTimeOut }) => {
	if (webSocketTimeOut) {
		setTimeout(() => {
			webSocket.close();
		}, webSocketTimeOut);
	}
};

const setSubscriptions = ({ webSocket, webSocketMessage, symbol }) => {
	webSocket.send(
		webSocketMessage.subscribeToOrderBook({
			symbol,
		}),
	);
};

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
