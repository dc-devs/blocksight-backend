import { generateAllFolderPaths } from './actions';
import { IFolderPaths } from '../../interfaces/folder-paths';

interface IConstructorProps {
	modelName: string;
}

class FolderPaths {
	folderPaths: IFolderPaths;

	constructor({ modelName }: IConstructorProps) {
		const folderPaths = generateAllFolderPaths({ modelName });

		this.folderPaths = folderPaths;
	}
}

export default FolderPaths;
