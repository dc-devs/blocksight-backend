import { createFile } from '../utils';
import { IFilePaths, IFileData } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createServiceFile = ({ filePaths, fileData }: IProps) => {
	createFile({
		data: fileData.root.service.data,
		file: filePaths.root.service.path,
	});
};

export default createServiceFile;
