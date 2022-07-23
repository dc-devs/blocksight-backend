import FilePaths from '../file-paths';
import { paramCase } from 'change-case';
import FolderPaths from '../folder-paths';
import { IFolderRoot, IFilePaths, IFolderPaths } from '../../interfaces';
import {
	createModuleFile,
	createServiceFile,
	createEnumsFolder,
	createResolverFile,
	createServiceSpecFile,
	createModelRootFolder,
	createResolverSpecFile,
	createDtoAndSubFolders,
} from './actions';

class GenerateModel {
	filePaths: IFilePaths;
	folderPaths: IFolderPaths;

	constructor(modelName: string) {
		const modelNameParamCase = paramCase(modelName);
		const { folderPaths } = new FolderPaths({
			rootPath: modelNameParamCase,
		});

		const { filePaths } = new FilePaths({
			rootPath: folderPaths.modelRoot.path,
			modelName: modelNameParamCase,
		});

		this.folderPaths = folderPaths;
		this.folderPaths = folderPaths;
		this.filePaths = filePaths;
	}

	createModelRootFolder = () => {
		createModelRootFolder(this.folderPaths.modelRoot);
	};

	createDtoAndSubFolders = () => {
		createDtoAndSubFolders(this.folderPaths.modelRoot);
	};

	createEnumsFolder = () => {
		createEnumsFolder(this.folderPaths.modelRoot);
	};

	createModuleFile = () => {
		createModuleFile({
			filePaths: this.filePaths,
		});
	};

	createResolverFile = () => {
		createResolverFile({
			filePaths: this.filePaths,
		});
	};

	createResolverSpecFile = () => {
		createResolverSpecFile({
			filePaths: this.filePaths,
		});
	};

	createServiceFile = () => {
		createServiceFile({
			filePaths: this.filePaths,
		});
	};

	createServiceSpecFile = () => {
		createServiceSpecFile({
			filePaths: this.filePaths,
		});
	};

	createNewModelFolders = () => {
		this.createModelRootFolder();
		this.createDtoAndSubFolders();
		this.createEnumsFolder();
	};

	createNewModelFiles = () => {
		this.createModuleFile();
		this.createResolverFile();
		this.createResolverSpecFile();
		this.createServiceFile();
		this.createServiceSpecFile();
	};

	start = () => {
		this.createNewModelFolders();
		this.createNewModelFiles();
	};
}

export default GenerateModel;
