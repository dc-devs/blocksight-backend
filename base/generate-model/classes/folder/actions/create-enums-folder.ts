import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

interface IProps {
	root: IFolderRoot;
}

const createEnumsFolder = ({ root }: IProps) => {
	const { enums } = root;

	createFolder({
		directory: enums.path,
	});
};

export default createEnumsFolder;
