import { createClient } from 'redis';
import Logger from '../../utils/logger';

let connectedRedisClient;

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

	connectedRedisClient = redisClient;

	return redisClient;
};

export { connectedRedisClient, initializeRedis };
