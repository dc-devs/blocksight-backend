import FileData from '../file-data';
import FilePaths from '../file-paths';
import { IFileData } from '../../interfaces/file-data';
import { IFilePaths } from '../../interfaces/file-paths';
import { IModelName } from '../../interfaces/model-name';
import { IFolderPaths } from '../../interfaces/folder-paths';
import createAllModelFiles from './actions/create-all-model-files';
import { IModel } from '../../interfaces/model';

interface IConstructorProps {
	folderPaths: IFolderPaths;
	modelName: IModelName;
	model: IModel;
}

class File {
	fileData: IFileData;
	filePaths: IFilePaths;

	constructor({ modelName, folderPaths, model }: IConstructorProps) {
		const { filePaths } = new FilePaths({
			modelName,
			folderPaths,
		});
		const { fileData } = new FileData({ modelName, model });

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
