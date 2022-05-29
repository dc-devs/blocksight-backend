import Logger from '../../utils/logger';
import { port, environment } from '../../common/constants';

const logInitMessage = () => {
	console.log('');
	Logger.debug('');
	Logger.debug('Port:', port);
	Logger.debug('Environment:', environment);
	Logger.debug('Redis:', process.env.REDIS_URL);
	Logger.debug('Database:', process.env.DATABASE_URL);
	Logger.debug('');
};

export default logInitMessage;
