import {
	runCreateTests,
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

describe('UsersExchanges', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
	runCreateTests();
});
