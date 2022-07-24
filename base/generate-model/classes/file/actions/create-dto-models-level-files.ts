import { createFile } from '../utils';
import { IFileData } from '../../../interfaces';
import { IFilePaths } from '../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createDtoModelsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.root.dto.models.model.data,
		file: filePaths.root.dto.models.model.path,
	});
};

export default createDtoModelsLevelFiles;
