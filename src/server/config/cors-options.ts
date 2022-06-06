import AppUrl from '../../common/enums/app-url';

export default {
	credentials: true,
	origin: [
		AppUrl.FRONTEND,
		AppUrl.DEV_SERVER,
		AppUrl.TEST_SERVER,
		AppUrl.APOLLO_CLIENT,
		AppUrl.FRONTEND_SECURE,
	],
	exposedHeaders: ['Set-Cookie'],
};
