import AppUrl from 'src/common/enums/app-url';

export default {
	credentials: true,
	origin: [AppUrl.APOLLO_CLIENT, AppUrl.FRONTEND],
};
