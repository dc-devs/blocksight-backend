import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

const createEnumsFolder = (modelRoot: IFolderRoot) => {
	const { enums } = modelRoot;

	createFolder(enums.path);
};

export default createEnumsFolder;
