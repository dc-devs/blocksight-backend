import FolderPaths from '../folder-paths';
import { IFolderPaths } from '../../interfaces/folder-paths';
import generateAllFolders from './actions/generate-all-folders';

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

	generateAllFolders = () => {
		generateAllFolders({
			folderPaths: this.folderPaths,
		});
	};
}

export default Folder;
