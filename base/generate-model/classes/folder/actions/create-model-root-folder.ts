import { createFolder } from '../utils';
import { IFolderPathRoot } from '../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathRoot;
}

const createModelRootFolder = ({ root }: IProps) => {
	createFolder({
		directory: root.path,
	});
};

export default createModelRootFolder;
