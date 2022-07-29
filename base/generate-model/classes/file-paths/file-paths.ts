import { generateAllFilePaths } from './actions';
import { IModelName } from '../../interfaces/model-name';
import { IFilePaths } from '../../interfaces/file-paths';
import { IFolderPaths } from '../../interfaces/folder-paths';

interface IConstructorProps {
	folderPaths: IFolderPaths;
	modelName: IModelName;
}

class FilePaths {
	filePaths: IFilePaths;

	constructor({ folderPaths, modelName }: IConstructorProps) {
		const filePaths = generateAllFilePaths({
			modelName,
			folderPaths,
		});

		this.filePaths = filePaths;
	}
}

export default FilePaths;
