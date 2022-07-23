import FilePaths from '../file-paths';
import { IFilePaths } from '../../interfaces';
import {
	createModuleFile,
	createServiceFile,
	createResolverFile,
	createServiceSpecFile,
	createResolverSpecFile,
} from './actions';

interface IConstructorProps {
	modelName: string;
	rootPath: string;
}

class File {
	filePaths: IFilePaths;

	constructor({ modelName, rootPath }: IConstructorProps) {
		const { filePaths } = new FilePaths({
			rootPath,
			modelName,
		});

		this.filePaths = filePaths;
	}

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

	generateNewModelFiles = () => {
		this.createModuleFile();
		this.createResolverFile();
		this.createResolverSpecFile();
		this.createServiceFile();
		this.createServiceSpecFile();
	};
}

export default File;
