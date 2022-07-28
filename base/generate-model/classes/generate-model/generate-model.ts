import File from '../file';
import Folder from '../Folder';
import { clean } from './actions';
import ModelName from '../model-name';
import FolderPaths from '../folder-paths';
import ModelAttributes from '../model-attributes';
import { IFolderPaths } from '../../interfaces/folder-paths';
import { IModelAttributesInput } from '../../interfaces/config';

interface IConstructorProps {
	isManyToMany?: boolean;
	attributes: IModelAttributesInput;
	modelNamePluralPascalCase: string;
}

class GenerateModel {
	folderPaths: IFolderPaths;
	generateAllFiles: CallableFunction;
	generateAllFolders: CallableFunction;

	constructor({
		attributes,
		isManyToMany = false,
		modelNamePluralPascalCase,
	}: IConstructorProps) {
		const modelName = new ModelName({
			isManyToMany,
			modelNamePluralPascalCase,
		});

		const { modelAttributes } = new ModelAttributes({
			attributes,
		});

		const { folderPaths } = new FolderPaths({
			modelName: modelName.plural.paramCase,
		});

		const { generateAllFolders } = new Folder({
			modelName: modelName.plural.paramCase,
		});

		const { generateAllFiles } = new File({
			modelName,
			modelAttributes,
			rootPath: folderPaths.src.root.path,
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
