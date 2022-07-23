import { paramCase } from 'change-case';
import FolderPaths from '../folder-paths';
import { ModelRoot } from '../../interfaces';
import { createFile } from './utils';
import {
	createEnumsFolder,
	createModelRootFolder,
	createDtoAndSubFolders,
} from './actions';

class GenerateModel {
	modelRoot: ModelRoot;
	folderPaths: FolderPaths;
	modelNameSnakeCase: string;
	modelNamePascalCase: string;

	constructor(modelName: string) {
		const modelNameSnakeCase = paramCase(modelName);
		const folderPaths = new FolderPaths(modelNameSnakeCase);
		const { modelRoot } = folderPaths;

		this.modelRoot = modelRoot;
		this.folderPaths = folderPaths;
		this.modelNamePascalCase = modelName;
		this.modelNameSnakeCase = modelNameSnakeCase;
	}

	createModelRootFolder = () => {
		createModelRootFolder(this.modelRoot);
	};

	createDtoAndSubFolders = () => {
		createDtoAndSubFolders(this.modelRoot);
	};

	createEnumsFolder = () => {
		createEnumsFolder(this.modelRoot);
	};

	createNewModelFolders = () => {
		this.createModelRootFolder();
		this.createDtoAndSubFolders();
		this.createEnumsFolder();
	};
}

export default GenerateModel;
