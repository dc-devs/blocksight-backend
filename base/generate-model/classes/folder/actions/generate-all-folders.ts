import { IFolderPaths } from '../../../interfaces/folder-paths';
import { generateSrcFolders } from './generate-src-folders';
import { generateTestFolders } from './generate-test-folders';

interface IProps {
	folderPaths: IFolderPaths;
}

const generateAllFolderPaths = ({ folderPaths }: IProps) => {
	generateSrcFolders({ root: folderPaths.src.root });
	generateTestFolders({ root: folderPaths.test.root });
};

export default generateAllFolderPaths;
