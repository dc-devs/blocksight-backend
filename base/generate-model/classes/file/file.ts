import FileData from '../file-data';
import FilePaths from '../file-paths';
import { IFileData } from '../../interfaces/file-data';
import { IFilePaths } from '../../interfaces/file-paths';
import { IModelName } from '../../interfaces/model-name';
import { IModelAttributes } from '../../interfaces/model-attribute';
import {
	createRootLevelFiles,
	createDtoModelsLevelFiles,
	createDtoInputsLevelFiles,
} from './actions';

interface IConstructorProps {
	rootPath: string;
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

class File {
	fileData: IFileData;
	filePaths: IFilePaths;

	constructor({ rootPath, modelName, modelAttributes }: IConstructorProps) {
		const { filePaths } = new FilePaths({
			rootPath,
			modelName,
		});
		const { fileData } = new FileData({ modelName, modelAttributes });

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

		createDtoModelsLevelFiles({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};
}

export default File;
