import { testApp } from '../../helpers/init/initializeTestApp';
import { redisClient } from '../../../src/server/initialize/initialize-redis';

afterAll(async () => {
	await redisClient.disconnect();
	await testApp.close();
});
