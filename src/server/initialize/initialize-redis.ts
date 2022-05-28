import { createClient } from 'redis';
import Logger from '../../utils/logger';


const initializeRedis = async () => {
	const redisClient = createClient({
		legacyMode: true,
		url: process.env.REDIS_URL,
	});

	redisClient.on('error', (error) => {
		Logger.error(
			'Redis:',
			`Could not establish a connection with redis. ${error}`,
		);
	});

	await redisClient.connect();

	return redisClient;
}

export default initializeRedis;