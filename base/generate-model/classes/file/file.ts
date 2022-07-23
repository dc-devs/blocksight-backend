import FilePaths from '../file-paths';
import { IFilePaths, IModelName, IModelAttributes } from '../../interfaces';
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
	modelName: IModelName;
	filePaths: IFilePaths;
	attributes: IModelAttributes;

	constructor({ rootPath, modelName, attributes }: IConstructorProps) {
		const { filePaths } = new FilePaths({
			rootPath,
			modelName: modelName.plural.paramCase,
		});

		this.modelName = modelName;
		this.filePaths = filePaths;
		this.attributes = attributes;
	}

	createModuleFile = () => {
		createModuleFile({
			modelName: this.modelName,
			filePaths: this.filePaths,
		});
	};

	createResolverFile = () => {
		createResolverFile({
			modelName: this.modelName,
			filePaths: this.filePaths,
		});
	};

	createResolverSpecFile = () => {
		createResolverSpecFile({
			modelName: this.modelName,
			filePaths: this.filePaths,
		});
	};

	createServiceFile = () => {
		createServiceFile({
			modelName: this.modelName,
			filePaths: this.filePaths,
			attributes: this.attributes,
		});
	};

	createServiceSpecFile = () => {
		createServiceSpecFile({
			modelName: this.modelName,
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
