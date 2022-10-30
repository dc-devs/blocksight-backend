import { Message } from '../../enums';
import { IOnErrorOptions } from '../../interfaces';

const setOnError = ({ logger, kuWebSocket }: IOnErrorOptions) => {
	kuWebSocket.onerror = (error) => {
		logger.error(Message.ConnectionError, Message.Error, error);
		kuWebSocket.close();
	};
};

export default setOnError;
