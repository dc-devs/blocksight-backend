import createEnumsFolder from './create-enums-folder';
import createModelRootFolder from './create-model-root-folder';
import createDtoAndSubFolders from './create-dto-and-sub-folders';
import { IFolderPathsSrcRoot } from '../../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathsSrcRoot;
}

const generateSrcFolders = ({ root }: IProps) => {
	createModelRootFolder({
		root,
	});

	createDtoAndSubFolders({
		root,
	});

	createEnumsFolder({
		root,
	});
};

export default generateSrcFolders;
