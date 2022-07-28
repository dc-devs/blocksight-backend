import { IFolderPaths } from '../../../interfaces/folder-paths';
import generateSrcFolderPaths from './generate-src-folder-paths/generate-src-folder-paths';
import generateTestFolderPaths from './generate-test-folder-paths/generate-test-folder-paths';

interface IProps {
	modelName: string;
}

const generateFolderPaths = ({ modelName }: IProps) => {
	const src = generateSrcFolderPaths({ modelName });
	const test = generateTestFolderPaths({ modelName });

	const paths: IFolderPaths = {
		src,
		test,
	};

	return paths;
};

export default generateFolderPaths;
