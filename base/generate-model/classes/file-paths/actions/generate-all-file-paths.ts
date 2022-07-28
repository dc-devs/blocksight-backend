import { IModelName } from '../../../interfaces/model-name';
import { IFilePaths } from '../../../interfaces/file-paths';
import { generateSrcFilePaths } from './generate-file-paths/generate-src-file-paths';
import { generateTestFilePaths } from './generate-file-paths/generate-test-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateAllFilePaths = ({ rootPath, modelName }: IProps) => {
	const srcFilePaths = generateSrcFilePaths({ rootPath, modelName });
	const testFilePaths = generateTestFilePaths({ rootPath, modelName });

	const paths: IFilePaths = {
		src: srcFilePaths,
		test: testFilePaths,
	}

	return paths;
};

export default generateAllFilePaths;
