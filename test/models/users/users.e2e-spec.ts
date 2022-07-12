import {
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

import {
	runLoginTests,
	runSignUpTests,
	runLogOutTests,
	runAllCurrentUserTests,
	runSignInMetaMaskTests,
} from '../auth/tests';

describe('Users', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
});

describe('Auth', () => {
	runLoginTests();
	runSignUpTests();
	runLogOutTests();
	runAllCurrentUserTests();
	runSignInMetaMaskTests();
});
