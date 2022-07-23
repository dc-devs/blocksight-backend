import { createFile } from '../utils';
import { IFilePaths, IFileData } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createResolverSpecFile = ({ filePaths, fileData }: IProps) => {
	createFile({
		data: fileData.root.resolverSpec.data,
		file: filePaths.root.resolverSpec.path,
	});
};

export default createResolverSpecFile;
