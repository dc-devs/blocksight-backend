import { createClient } from 'redis';
import Logger from '../../utils/logger';

export const redisClient = createClient({
	legacyMode: true,
	url: process.env.REDIS_URL,
});

const initializeRedis = async () => {
	redisClient.on('error', (error) => {
		Logger.error(
			'Redis:',
			`Could not establish a connection with redis. ${error}`,
		);
	});

	await redisClient.connect();

	return redisClient;
};

export default initializeRedis;
