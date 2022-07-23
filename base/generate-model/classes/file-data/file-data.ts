import { generateFileData } from './utils';
import { IModelName, IModelAttributes, IFileData } from '../../interfaces';

interface IConstructorProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

class FileData {
	fileData: IFileData;

	constructor({ modelName, attributes }: IConstructorProps) {
		const fileData = generateFileData({ modelName, attributes });

		this.fileData = fileData;
	}
}

export default FileData;
