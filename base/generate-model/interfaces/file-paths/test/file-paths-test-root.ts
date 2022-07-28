import IFilePathsTestsEnums from './file-paths-enums';
import IFilePathsTestsTests from './file-paths-tests';
import IFilePathsTestsQueries from './file-paths-queries';
import IFilePathsTestsExpectedObjects from './file-paths-expected-objects';

interface IFilePathsTestRoot {
	enums: IFilePathsTestsEnums;
	tests: IFilePathsTestsTests;
	queries: IFilePathsTestsQueries;
	expectedObjects: IFilePathsTestsExpectedObjects;
}

export default IFilePathsTestRoot;
