import Logger from '../../utils/logger';
import { port, environment } from '../../common/constants';

const logInitMessage = () => {
	console.log('');
	Logger.debug('');
	Logger.debug('Port:', port);
	Logger.debug('Environment:', environment);
	Logger.debug('');
};

export default logInitMessage;
