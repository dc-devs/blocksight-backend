import { createFile } from '../utils';
import { IFilePaths, IFileData } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createResolverFile = ({ filePaths, fileData }: IProps) => {
	createFile({
		data: fileData.root.resolver.data,
		file: filePaths.root.resolver.path,
	});
};

export default createResolverFile;
