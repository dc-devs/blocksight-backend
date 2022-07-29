import FileData from '../file-data';
import FilePaths from '../file-paths';
import { IFileData } from '../../interfaces/file-data';
import { IFilePaths } from '../../interfaces/file-paths';
import { IModelName } from '../../interfaces/model-name';
import { IFolderPaths } from '../../interfaces/folder-paths';
import createAllModelFiles from './actions/create-all-model-files';
import { IModelAttributes } from '../../interfaces/model-attribute';

interface IConstructorProps {
	folderPaths: IFolderPaths;
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

class File {
	fileData: IFileData;
	filePaths: IFilePaths;

	constructor({
		modelName,
		folderPaths,
		modelAttributes,
	}: IConstructorProps) {
		const { filePaths } = new FilePaths({
			modelName,
			folderPaths,
		});
		const { fileData } = new FileData({ modelName, modelAttributes });

		this.fileData = fileData;
		this.filePaths = filePaths;
	}

	generateAllFiles = () => {
		createAllModelFiles({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};
}

export default File;
