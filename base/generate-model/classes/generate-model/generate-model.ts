import { paramCase } from 'change-case';
import FolderPaths from '../folder-paths';
import { createFile, createFolder } from './utils';
import { ModelRoot } from '../folder-paths/interfaces';

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
		createFolder(this.modelRoot.path);
	};

	createDtoAndSubFolders = () => {
		const { dto } = this.modelRoot;
		const { inputs, prisma, models } = dto;

		createFolder(dto.path);
		createFolder(inputs.path);
		createFolder(prisma.path);
		createFolder(models.path);
	};

	createEnumsFolder = () => {
		const { enums } = this.modelRoot;

		createFolder(enums.path);
	};

	createNewModelFolders = () => {
		this.createModelRootFolder();
		this.createDtoAndSubFolders();
		this.createEnumsFolder();
	};
}

export default GenerateModel;
