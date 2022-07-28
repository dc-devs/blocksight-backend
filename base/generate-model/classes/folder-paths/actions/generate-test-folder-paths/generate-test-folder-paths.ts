import { join } from 'path';
import { FolderName } from '../../enums';
import generateTestRootFolderPath from './generate-test-root-folder-path';
import { IFolderPathsTest } from '../../../../interfaces/folder-paths';

interface IProps {
	modelName: string;
}

const generateTestFolderPaths = ({ modelName }: IProps): IFolderPathsTest => {
	const rootFolderPath = generateTestRootFolderPath({ modelName });
	const enumsFolderPath = join(rootFolderPath, FolderName.ENUMS);
	const testsFolderPath = join(rootFolderPath, FolderName.TESTS);
	const queriesFolderPath = join(rootFolderPath, FolderName.QUERIES);
	const expectedObjectsFolderPath = join(rootFolderPath, FolderName.EXPECTED_OBJECTS);

	return {
		root: {
			path: rootFolderPath,
			enums: {
				path: enumsFolderPath,
			},
			queries: {
				path: queriesFolderPath,
			},
			tests: {
				path: testsFolderPath,
			},
			expectedObjects: {
				path: expectedObjectsFolderPath,
			},
		},
	};
};

export default generateTestFolderPaths;
