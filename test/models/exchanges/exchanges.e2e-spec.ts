import {
	runUpdateTests, runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

describe('Exchanges', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
});
