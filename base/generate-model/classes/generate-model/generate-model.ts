import File from '../file';
import rimraf from 'rimraf';
import Folder from '../Folder';
import { paramCase } from 'change-case';
import FolderPaths from '../folder-paths';
import { IFolderPaths } from '../../interfaces';

interface IConstructorProps {
	modelName: string;
}

class GenerateModel {
	folderPaths: IFolderPaths;
	generateNewModelFiles: CallableFunction;
	generateNewModelFolders: CallableFunction;

	constructor({ modelName }: IConstructorProps) {
		const modelNameParamCase = paramCase(modelName);

		const { folderPaths } = new FolderPaths({
			modelName: modelNameParamCase,
		});

		const { generateNewModelFolders } = new Folder({
			modelName: modelNameParamCase,
		});

		const { generateNewModelFiles } = new File({
			modelName: modelNameParamCase,
			rootPath: folderPaths.root.path,
		});

		this.folderPaths = folderPaths;
		this.generateNewModelFiles = generateNewModelFiles;
		this.generateNewModelFolders = generateNewModelFolders;
	}

	clean = () => {
		rimraf(this.folderPaths.root.path, () => {});
	};

	start = () => {
		this.generateNewModelFolders();
		this.generateNewModelFiles();
	};
}

export default GenerateModel;
