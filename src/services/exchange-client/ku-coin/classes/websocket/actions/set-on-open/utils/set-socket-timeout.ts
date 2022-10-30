import WebSocket from 'ws';

interface ISetWebSocketTimeOutOptions {
	webSocket: WebSocket;
	webSocketTimeOut: number;
}

const setWebSocketTimeOut = ({
	webSocket,
	webSocketTimeOut,
}: ISetWebSocketTimeOutOptions) => {
	if (webSocketTimeOut) {
		setTimeout(() => {
			webSocket.close();
		}, webSocketTimeOut);
	}
};

export default setWebSocketTimeOut;
