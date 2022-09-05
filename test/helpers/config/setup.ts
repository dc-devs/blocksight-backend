import { testApp } from '../../helpers/init/initializeTestApp';
import { connectedRedisClient } from '../../../src/server/initialize/initialize-redis';

// Turned-Off, can't get to run once after all tests..
afterAll(async () => {
	if (connectedRedisClient) {
		await connectedRedisClient.disconnect;
	}

	if (testApp) {
		await testApp.close;
	}
});
