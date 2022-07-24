import generateFileData from './generate-file-data';
import { IModelName, IFileData, IModelAttributes } from '../../interfaces';

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
