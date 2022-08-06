import File from '../file';
import Model from '../model';
import Folder from '../Folder';
import { clean } from './actions';
import ModelName from '../model-name';
import FolderPaths from '../folder-paths';
import { IFolderPaths } from '../../interfaces/folder-paths';
import { IGenerateModelConstructorProps } from '../../interfaces/config';

class GenerateModel {
	folderPaths: IFolderPaths;
	generateAllFiles: CallableFunction;
	generateAllFolders: CallableFunction;

	constructor({
		tests,
		attributes,
		relatedTo,
		relationType,
		modelNamePluralPascalCase,
	}: IGenerateModelConstructorProps) {
		const relationalModelNames = {};

		const modelName = new ModelName({
			relationType,
			modelNamePluralPascalCase,
		});

		Object.keys(relatedTo).forEach((modelName) => {
			relationalModelNames[modelName] = new ModelName({
				modelNamePluralPascalCase: modelName,
			});
		});

		const { model } = new Model({
			tests,
			modelName,
			relatedTo,
			attributes,
			relationType,
			relationalModelNames,
		});

		const { folderPaths } = new FolderPaths({
			modelName: modelName.plural.paramCase,
		});

		const { generateAllFolders } = new Folder({
			modelName: modelName.plural.paramCase,
		});

		const { generateAllFiles } = new File({
			folderPaths,
			modelName,
			model,
		});

		this.folderPaths = folderPaths;
		this.generateAllFiles = generateAllFiles;
		this.generateAllFolders = generateAllFolders;
	}

	clean = () => {
		clean({ rootPath: this.folderPaths.src.root.path });
		clean({ rootPath: this.folderPaths.test.root.path });
	};

	start = () => {
		this.generateAllFolders();
		this.generateAllFiles();
	};
}

export default GenerateModel;
