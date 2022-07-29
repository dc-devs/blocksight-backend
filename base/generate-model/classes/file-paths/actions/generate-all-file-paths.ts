import { IModelName } from '../../../interfaces/model-name';
import { IFilePaths } from '../../../interfaces/file-paths';
import { IFolderPaths } from '../../../interfaces/folder-paths';
import { generateSrcFilePaths } from './generate-file-paths/generate-src-file-paths';
import { generateTestFilePaths } from './generate-file-paths/generate-test-file-paths';

interface IProps {
	modelName: IModelName;
	folderPaths: IFolderPaths;
}

const generateAllFilePaths = ({ folderPaths, modelName }: IProps) => {
	const srcFilePaths = generateSrcFilePaths({
		rootPath: folderPaths.src.root.path,
		modelName,
	});
	const testFilePaths = generateTestFilePaths({
		rootPath: folderPaths.test.root.path,
		modelName,
	});

	const paths: IFilePaths = {
		src: srcFilePaths,
		test: testFilePaths,
	};

	return paths;
};

export default generateAllFilePaths;
