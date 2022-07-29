import { join } from 'path';
import { FileName } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IFilePathsTest } from '../../../../../interfaces/file-paths';
import generateTestsLevelFilePaths from './tests/generate-tests-level-file-paths';
import generateEnumsLevelFilePaths from './enums/generate-enums-level-file-paths';
import generateQueriesLevelFilePaths from './queries/generate-queries-level-file-paths';
import generateExpectedObjectsLevelFilePaths from './expected-objects/generate-expected-objects-level-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateTestFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsTest => {
	const enums = generateEnumsLevelFilePaths({
		rootPath: join(rootPath, FileName.ENUMS),
		modelName,
	});

	const tests = generateTestsLevelFilePaths({
		rootPath: join(rootPath, FileName.TESTS),
		modelName,
	});

	const queries = generateQueriesLevelFilePaths({
		rootPath: join(rootPath, FileName.QUERIES),
		modelName,
	});
	
	const expectedObjects = generateExpectedObjectsLevelFilePaths({
		rootPath: join(rootPath, FileName.QUERIES),
		modelName,
	});

	const paths: IFilePathsTest = {
		root: {
			enums,
			tests,
			queries,
			expectedObjects,
		},
	};

	return paths;
};

export default generateTestFilePaths;
