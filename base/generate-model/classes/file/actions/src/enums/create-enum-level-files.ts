import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createEnumLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.src.root.enums.index.data,
		file: filePaths.src.root.enums.index.path,
	});

	createFile({
		data: fileData.src.root.enums.validationError.data,
		file: filePaths.src.root.enums.validationError.path,
	});
};

export default createEnumLevelFiles;
