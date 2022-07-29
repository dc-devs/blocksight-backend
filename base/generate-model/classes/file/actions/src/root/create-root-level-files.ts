import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createRootLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.root.module.data,
		file: filePaths.src.root.module.path,
	});

	createFile({
		data: fileData.root.resolver.data,
		file: filePaths.src.root.resolver.path,
	});

	createFile({
		data: fileData.root.resolverSpec.data,
		file: filePaths.src.root.resolverSpec.path,
	});

	createFile({
		data: fileData.root.service.data,
		file: filePaths.src.root.service.path,
	});

	createFile({
		data: fileData.root.serviceSpec.data,
		file: filePaths.src.root.serviceSpec.path,
	});
};

export default createRootLevelFiles;
