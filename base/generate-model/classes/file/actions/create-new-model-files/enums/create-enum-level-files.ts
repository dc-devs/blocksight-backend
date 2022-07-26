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
		file: filePaths.root.enums.index.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.enums.name.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.enums.validationError.path,
	});
};

export default createEnumLevelFiles;
