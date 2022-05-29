import AppUrl from '../../common/enums/app-url';

export default {
	credentials: true,
	origin: [AppUrl.APOLLO_CLIENT, AppUrl.FRONTEND, AppUrl.DEV_SERVER, AppUrl.TEST_SERVER],
};
