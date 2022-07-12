import { runSignUpTests, runSignInMetaMaskTests } from '../auth/tests';
import {
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

describe('Users', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
});

describe('Auth', () => {
	runSignUpTests();
	runSignInMetaMaskTests();
});
