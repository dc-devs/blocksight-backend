import { createClient } from 'redis';
import Logger from 'src/utils/logger';


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
	
	redisClient.on('connect', () => {
		Logger.success('Redis:', `'Connected to redis successfully'`);
	});
	
	await redisClient.connect();

	return redisClient;
}

export default initializeRedis;