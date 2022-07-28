import { createFolder } from '../../utils';
import { IFolderPathsSrcRoot } from '../../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathsSrcRoot;
}

const createModelRootFolder = ({ root }: IProps) => {
	createFolder({
		directory: root.path,
	});
};

export default createModelRootFolder;
