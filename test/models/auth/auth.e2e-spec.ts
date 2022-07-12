import { runLoginTests, runLogOutTests, runCurrentUserTests } from './tests';

describe('Auth', () => {
	runLoginTests();
	runLogOutTests();
	runCurrentUserTests();
});
