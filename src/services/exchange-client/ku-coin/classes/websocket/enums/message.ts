enum Message {
	Code = 'code:',
	Error = 'error:',
	MessageRecieved = '[KuCoin WebSocket] Message Recieved',
	ConnectionEstablished = '[KuCoin WebSocket] Connection Established',
	ConnectionClosedCleanly = '[KuCoin WebSocket] Connection Closed Cleanly',
	ConnectionDied = '[KuCoin WebSocket] Connection Died (server process killed or network down)',
	ConnectionError = '[KuCoin WebSocket] Connection Error',
}

export default Message;
