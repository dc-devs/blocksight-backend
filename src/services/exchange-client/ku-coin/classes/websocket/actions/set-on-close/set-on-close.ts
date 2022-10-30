import { Message } from '../../enums';
import { IOnCloseOptions } from '../../interfaces';

const setOnClose = ({ logger, webSocket, orderBook }: IOnCloseOptions) => {
	webSocket.onclose = (event) => {
		if (event.wasClean) {
			logger.debug(
				Message.ConnectionClosedCleanly,
				Message.Code,
				event.code,
			);

			if (orderBook) {
				orderBook.saveAllMessagesToFile();
				orderBook.saveAllUpdatesToFile();
			}
		} else {
			logger.error(Message.ConnectionDied, Message.Code, event.code);
		}
	};
};

export default setOnClose;
