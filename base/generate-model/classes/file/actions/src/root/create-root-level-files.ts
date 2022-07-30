import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createRootLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.src.root.module.data,
		file: filePaths.src.root.module.path,
	});

	createFile({
		data: fileData.src.root.resolver.data,
		file: filePaths.src.root.resolver.path,
	});

	createFile({
		data: fileData.src.root.resolverSpec.data,
		file: filePaths.src.root.resolverSpec.path,
	});

	createFile({
		data: fileData.src.root.service.data,
		file: filePaths.src.root.service.path,
	});

	createFile({
		data: fileData.src.root.serviceSpec.data,
		file: filePaths.src.root.serviceSpec.path,
	});
};

export default createRootLevelFiles;
