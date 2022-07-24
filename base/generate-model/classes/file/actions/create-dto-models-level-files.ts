import { createFile } from '../utils';
import { IFileData, IFilePaths } from '../../../interfaces';

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
