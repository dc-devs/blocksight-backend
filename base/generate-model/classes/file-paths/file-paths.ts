import { generateAllFilePaths } from './actions';
import { IModelName } from '../../interfaces/model-name';
import { IFilePaths } from '../../interfaces/file-paths';

interface IConstructorProps {
	rootPath: string;
	modelName: IModelName;
}

class FilePaths {
	filePaths: IFilePaths;

	constructor({ rootPath, modelName }: IConstructorProps) {
		const filePaths = generateAllFilePaths({
			rootPath,
			modelName,
		});

		this.filePaths = filePaths;
	}
}

export default FilePaths;
