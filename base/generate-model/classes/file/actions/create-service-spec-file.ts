import { createFile } from '../utils';
import { IFilePaths, IFileData } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createServiceSpecFile = ({ filePaths, fileData }: IProps) => {
	createFile({
		data: fileData.root.serviceSpec.data,
		file: filePaths.root.serviceSpec.path,
	});
};

export default createServiceSpecFile;
