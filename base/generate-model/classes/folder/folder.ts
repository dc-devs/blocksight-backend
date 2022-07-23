import FolderPaths from '../folder-paths';
import { IFolderPaths } from '../../interfaces';
import {
	createEnumsFolder,
	createModelRootFolder,
	createDtoAndSubFolders,
} from './actions';

interface IConstructorProps {
	modelName: string;
}

class Folder {
	folderPaths: IFolderPaths;

	constructor({ modelName }: IConstructorProps) {
		const { folderPaths } = new FolderPaths({
			modelName,
		});

		this.folderPaths = folderPaths;
	}

	createModelRootFolder = () => {
		createModelRootFolder(this.folderPaths.root);
	};

	createDtoAndSubFolders = () => {
		createDtoAndSubFolders(this.folderPaths.root);
	};

	createEnumsFolder = () => {
		createEnumsFolder(this.folderPaths.root);
	};

	generateNewModelFolders = () => {
		this.createModelRootFolder();
		this.createDtoAndSubFolders();
		this.createEnumsFolder();
	};
}

export default Folder;
