import { Message } from '../../enums';
import { IOnErrorOptions } from '../../interfaces';

const setOnError = ({ logger, webSocket }: IOnErrorOptions) => {
	webSocket.onerror = (error) => {
		logger.error(Message.ConnectionError, Message.Error, error);
		webSocket.close();
	};
};

export default setOnError;
