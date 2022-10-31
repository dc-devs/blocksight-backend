import { Message } from '../../enums';
import { IOnCloseOptions } from '../../interfaces';

const setOnClose = ({
	logger,
	orderBook,
	footprint,
	kuWebSocket,
}: IOnCloseOptions) => {
	kuWebSocket.onclose = (event) => {
		if (event.wasClean) {
			logger.debug(
				Message.ConnectionClosedCleanly,
				Message.Code,
				event.code,
			);
		} else {
			logger.error(Message.ConnectionDied, Message.Code, event.code);
		}

		if (orderBook) {
			// orderBook.saveAllMessagesToFile();
			// orderBook.saveAllUpdatesToFile();
		}

		if (footprint) {
			footprint.saveAllMessagesToFile();
			footprint.saveAllUpdatesToFile();
		}
	};
};

export default setOnClose;
