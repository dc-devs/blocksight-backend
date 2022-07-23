import File from '../file';
import { paramCase } from 'change-case';
import FolderPaths from '../folder-paths';
import { IFolderPaths } from '../../interfaces';
import {
	createEnumsFolder,
	createModelRootFolder,
	createDtoAndSubFolders,
} from './actions';

class GenerateModel {
	folderPaths: IFolderPaths;
	generateNewModelFiles: CallableFunction;

	constructor(modelName: string) {
		const modelNameParamCase = paramCase(modelName);
		const { folderPaths } = new FolderPaths({
			rootPath: modelNameParamCase,
		});

		const file = new File({
			modelName: modelNameParamCase,
			rootPath: folderPaths.root.path,
		});

		this.folderPaths = folderPaths;
		this.generateNewModelFiles = file.generateNewModelFiles;
	}

	createModelRootFolder = () => {
		createModelRootFolder(this.folderPaths.root);
	};

	createDtoAndSubFolders = () => {
		createDtoAndSubFolders(this.folderPaths.root);
	};

	createEnumsFolder = () => {
		createEnumsFolder(this.folderPaths.root);
	};

	createNewModelFolders = () => {
		this.createModelRootFolder();
		this.createDtoAndSubFolders();
		this.createEnumsFolder();
	};

	start = () => {
		this.createNewModelFolders();
		this.generateNewModelFiles();
	};
}

export default GenerateModel;
