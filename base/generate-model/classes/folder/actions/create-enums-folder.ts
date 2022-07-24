import { createFolder } from '../utils';
import { IFolderPathRoot } from '../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathRoot;
}

const createEnumsFolder = ({ root }: IProps) => {
	const { enums } = root;

	createFolder({
		directory: enums.path,
	});
};

export default createEnumsFolder;
