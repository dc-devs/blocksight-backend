import IData from '../data';
import IFileDataTestEnums from './file-data-test-enums';
import IFileDataTestTests from './file-data-test-tests';
import IFileDataTestQueries from './file-data-test-queries';
import IFileDataTestExpectedObjects from './file-data-test-expected-objects';

interface IFileDataSrcRoot {
	testSpec: IData;
	enums: IFileDataTestEnums;
	tests: IFileDataTestTests;
	queries: IFileDataTestQueries;
	expectedObjects: IFileDataTestExpectedObjects;
}

export default IFileDataSrcRoot;
