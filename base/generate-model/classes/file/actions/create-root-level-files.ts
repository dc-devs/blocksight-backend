import { createFile } from '../utils';
import {
	IFileData,
	IFilePaths,
} from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createRootLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.root.module.data,
		file: filePaths.root.module.path,
	});

	createFile({
		data: fileData.root.resolver.data,
		file: filePaths.root.resolver.path,
	});

	createFile({
		data: fileData.root.resolverSpec.data,
		file: filePaths.root.resolverSpec.path,
	});

	createFile({
		data: fileData.root.service.data,
		file: filePaths.root.service.path,
	});

	createFile({
		data: fileData.root.serviceSpec.data,
		file: filePaths.root.serviceSpec.path,
	});
};


export default createRootLevelFiles;