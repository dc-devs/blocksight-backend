import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

const createModelRootFolder = (modelRoot: IFolderRoot) => {
	createFolder(modelRoot.path);
};

export default createModelRootFolder;
