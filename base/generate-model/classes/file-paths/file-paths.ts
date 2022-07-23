import { generateFilePaths } from './utils';
import { IFilePaths, IModelName } from '../../interfaces';

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
