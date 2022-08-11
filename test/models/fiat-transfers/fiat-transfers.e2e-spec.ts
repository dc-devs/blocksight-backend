import {
	runCreateTests,
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

describe('FiatTransfers', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
	runCreateTests();
});
