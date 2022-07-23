import { createFile } from '../utils';
import { IFilePaths, IFileData } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createModuleFile = ({ filePaths, fileData }: IProps) => {
	createFile({
		data: fileData.root.module.data,
		file: filePaths.root.module.path,
	});
};

export default createModuleFile;
