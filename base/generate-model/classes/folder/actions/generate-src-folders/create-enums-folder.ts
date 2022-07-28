import { createFolder } from '../../utils';
import { IFolderPathsSrcRoot } from '../../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathsSrcRoot;
}

const createEnumsFolder = ({ root }: IProps) => {
	const { enums } = root;

	createFolder({
		directory: enums.path,
	});
};

export default createEnumsFolder;
