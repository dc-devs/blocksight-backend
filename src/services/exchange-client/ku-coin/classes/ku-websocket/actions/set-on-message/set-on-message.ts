import { Message } from '../../enums';
import { IOnMessageOptions } from '../../interfaces';

const setOnMessage = ({ logger, webSocket, orderBook }: IOnMessageOptions) => {
	webSocket.onmessage = (event) => {
		const { data: message } = event;

		if (typeof message === 'string') {
			if (message.includes('"id"')) {
				logger.debug(Message.MessageRecieved, message);
			}

			if (message.includes('error')) {
				webSocket.close();
			}

			if (message.includes('bid')) {
				if (orderBook) {
					orderBook.addMessage({
						message,
					});
				}
			}
		}
	};
};

export default setOnMessage;
