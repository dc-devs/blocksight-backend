import { IFileData } from '../../../../interfaces/file-data';
import { IFilePaths } from '../../../../interfaces/file-paths';
import createEnumLevelFiles from './enums/create-enum-level-files';
import createTestsLevelFiles from './tests/create-tests-level-files';
import createQueriesLevelFiles from './queries/create-queries-level-files';
import createExpectedObjectsLevelFiles from './expected-objects/create-expected-objects-level-files';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createAllSrcModelFiles = ({ fileData, filePaths }: IProps) => {
	createEnumLevelFiles({ fileData, filePaths });
	createTestsLevelFiles({ fileData, filePaths });
	createQueriesLevelFiles({ fileData, filePaths });
	createExpectedObjectsLevelFiles({ fileData, filePaths });
};

export default createAllSrcModelFiles;
