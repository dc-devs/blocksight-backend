import File from '../file';
import Folder from '../Folder';
import { clean } from './actions';
import ModelName from '../model-name';
import FolderPaths from '../folder-paths';
import ModelAttributes from '../model-attributes';
import { IFolderPaths } from '../../interfaces/folder-paths';
import { IGenerateModelConstructorProps } from '../../interfaces/config';

class GenerateModel {
	folderPaths: IFolderPaths;
	generateAllFiles: CallableFunction;
	generateAllFolders: CallableFunction;

	constructor({
		attributes,
		relatedTo,
		relationType,
		modelNamePluralPascalCase,
	}: IGenerateModelConstructorProps) {
		const modelName = new ModelName({
			relationType,
			modelNamePluralPascalCase,
		});

		const { modelAttributes } = new ModelAttributes({
			relatedTo,
			attributes,
			relationType,
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
			modelAttributes,
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
