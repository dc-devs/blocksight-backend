import FileData from '../file-data';
import FilePaths from '../file-paths';
import {
	IFileData,
	IFilePaths,
	IModelName,
	IModelAttributes,
} from '../../interfaces';
import {
	createModuleFile,
	createServiceFile,
	createResolverFile,
	createServiceSpecFile,
	createResolverSpecFile,
} from './actions';

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
			modelName: modelName.plural.paramCase,
		});
		const { fileData } = new FileData({ modelName, attributes });

		this.fileData = fileData;
		this.filePaths = filePaths;
	}

	createModuleFile = () => {
		createModuleFile({ 
			fileData: this.fileData,
			filePaths: this.filePaths, 
		});
	};

	createResolverFile = () => {
		createResolverFile({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};

	createResolverSpecFile = () => {
		createResolverSpecFile({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};

	createServiceFile = () => {
		createServiceFile({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};

	createServiceSpecFile = () => {
		createServiceSpecFile({
			fileData: this.fileData,
			filePaths: this.filePaths,
		});
	};

	generateNewModelFiles = () => {
		this.createModuleFile();
		this.createResolverFile();
		this.createResolverSpecFile();
		this.createServiceFile();
		this.createServiceSpecFile();
	};
}

export default File;
