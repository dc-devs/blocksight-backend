import generateFileData from './generate-file-data';
import { IModelName, IFileData } from '../../interfaces';

interface IConstructorProps {
	modelName: IModelName;
	modelAttributes: any;
}

class FileData {
	fileData: IFileData;

	constructor({ modelName, modelAttributes }: IConstructorProps) {
		const fileData = generateFileData({ modelName, modelAttributes });

		this.fileData = fileData;
	}
}

export default FileData;
