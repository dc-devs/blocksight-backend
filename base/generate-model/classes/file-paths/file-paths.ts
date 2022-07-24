import { generateFilePaths } from './utils';
import { IModelName } from '../../interfaces/model-name';
import { IFilePaths } from '../../interfaces/file-paths';

interface IConstructorProps {
	rootPath: string;
	modelName: IModelName;
}

class FilePaths {
	filePaths: IFilePaths;

	constructor({ rootPath, modelName }: IConstructorProps) {
		const filePaths = generateFilePaths({
			rootPath,
			modelName,
		});

		this.filePaths = filePaths;
	}
}

export default FilePaths;
