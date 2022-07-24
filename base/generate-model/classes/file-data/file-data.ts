import generateFileData from './generate-file-data';
import { IFileData } from '../../interfaces/file-data';
import { IModelName } from '../../interfaces/model-name';
import { IModelAttributes } from '../../interfaces/model-attribute';

interface IConstructorProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

class FileData {
	fileData: IFileData;

	constructor({ modelName, modelAttributes }: IConstructorProps) {
		const fileData = generateFileData({ modelName, modelAttributes });

		this.fileData = fileData;
	}
}

export default FileData;
