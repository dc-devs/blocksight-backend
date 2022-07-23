import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

interface IProps {
	root: IFolderRoot;
}

const createModelRootFolder = ({ root }: IProps) => {
	createFolder({
		directory: root.path,
	});
};

export default createModelRootFolder;
