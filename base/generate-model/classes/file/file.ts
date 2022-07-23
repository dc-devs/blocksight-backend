import FileData from '../file-data';
import FilePaths from '../file-paths';
import { createRootLevelFiles, createDtoInputsLevelFiles } from './actions';
import {
	IFileData,
	IFilePaths,
	IModelName,
	IModelAttributes,
} from '../../interfaces';

interface IConstructorProps {
	rootPath: string;
	modelName: IModelName;
	attributes: IModelAttributes;
}

class File {
	fileData: IFileData;
	filePaths: IFilePaths;

	constructor({ rootPath, modelName, attributes }: IConstructorProps) {
		const { filePaths } = new FilePaths({
			rootPath,
			modelName,
		});
		const { fileData } = new FileData({ modelName, attributes });

		this.fileData = fileData;
		this.filePaths = filePaths;
	}

	generateNewModelFiles = () => {
		createRootLevelFiles({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});

		createDtoInputsLevelFiles({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};
}

export default File;
