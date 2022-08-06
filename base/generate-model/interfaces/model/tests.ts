import ITestsUpdate from './tests-update';
import ITestFindAll from './tests-find-all';

interface ITests {
	update?: ITestsUpdate;
	findAll?: ITestFindAll;
}

export default ITests;
