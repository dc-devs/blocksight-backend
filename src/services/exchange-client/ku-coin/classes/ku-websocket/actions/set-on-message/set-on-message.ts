import { Message } from '../../enums';
import { IOnMessageOptions } from '../../interfaces';

enum MessageIdentifer {
	Error = 'error',
	KuCoinMessage = '"id":',
	Level2 = `"topic":"/market/level2`,
	MatchExecution = `"topic":"/market/match`,
}

const setOnMessage = ({
	logger,
	footprint,
	orderBook,
	kuWebSocket,
}: IOnMessageOptions) => {
	kuWebSocket.onmessage = (event) => {
		const { data: message } = event;
		const messageIsString = typeof message === 'string';

		if (messageIsString) {
			if (message.includes(MessageIdentifer.KuCoinMessage)) {
				logger.debug(Message.MessageRecieved, message);
			}

			
			if (message.includes(MessageIdentifer.Error)) {
				kuWebSocket.close();
			}
			
			if (message.includes(MessageIdentifer.Level2)) {
				if (orderBook) {
					orderBook.addMessage({
						message,
					});
				}
			}
			
			if (message.includes(MessageIdentifer.MatchExecution)) {
				if (footprint) {
					footprint.addMessage({message});
				};
			}
		}
	};
};

export default setOnMessage;
