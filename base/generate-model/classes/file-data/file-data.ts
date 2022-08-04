import { IFileData } from '../../interfaces/file-data';
import { IModelName } from '../../interfaces/model-name';
import generateFileData from './actions/generate-file-data';
import { IModel } from '../../interfaces/model';

interface IConstructorProps {
	modelName: IModelName;
	model: IModel;
}

class FileData {
	fileData: IFileData;

	constructor({ modelName, model }: IConstructorProps) {
		const fileData = generateFileData({ modelName, model });

		this.fileData = fileData;
	}
}

export default FileData;
