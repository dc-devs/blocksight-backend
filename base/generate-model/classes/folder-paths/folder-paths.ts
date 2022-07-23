import { generateFolderPaths } from './utils';
import { IFolderPaths } from '../../interfaces';

interface IConstructorProps {
	rootPath: string;
}

class FolderPaths {
	folderPaths: IFolderPaths;

	constructor({ rootPath }: IConstructorProps) {
		const folderPaths = generateFolderPaths(rootPath);

		this.folderPaths = folderPaths;
	}
}

export default FolderPaths;
