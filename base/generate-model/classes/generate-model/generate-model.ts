import File from '../file';
import Folder from '../Folder';
import { clean } from './actions';
import ModelName from '../model-name';
import FolderPaths from '../folder-paths';
import ModelAttributes from '../model-attributes';
import { IModelAttributesInput } from '../../interfaces';
import { IFolderPaths } from '../../interfaces/folder-paths';

interface IConstructorProps {
	isManyToMany?: boolean;
	attributes: IModelAttributesInput;
	modelNamePluralPascalCase: string;
}

class GenerateModel {
	folderPaths: IFolderPaths;
	generateNewModelFiles: CallableFunction;
	generateNewModelFolders: CallableFunction;

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

		const { generateNewModelFolders } = new Folder({
			modelName: modelName.plural.paramCase,
		});

		const { generateNewModelFiles } = new File({
			modelName,
			modelAttributes,
			rootPath: folderPaths.root.path,
		});

		this.folderPaths = folderPaths;
		this.generateNewModelFiles = generateNewModelFiles;
		this.generateNewModelFolders = generateNewModelFolders;
	}

	clean = () => {
		clean({ rootPath: this.folderPaths.root.path });
	};

	start = () => {
		this.generateNewModelFolders();
		this.generateNewModelFiles();
	};
}

export default GenerateModel;
