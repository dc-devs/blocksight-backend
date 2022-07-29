import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createEnumLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: '',
		file: filePaths.test.root.enums.errorMessage.path,
	});
};

export default createEnumLevelFiles;
