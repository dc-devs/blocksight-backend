import { generateFolderPaths } from './utils';
import { IFolderPaths } from '../../interfaces/folder-paths';

interface IConstructorProps {
	modelName: string;
}

class FolderPaths {
	folderPaths: IFolderPaths;

	constructor({ modelName }: IConstructorProps) {
		const folderPaths = generateFolderPaths({ modelName });

		this.folderPaths = folderPaths;
	}
}

export default FolderPaths;
