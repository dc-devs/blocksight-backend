import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createModelsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.src.root.dto.models.model.data,
		file: filePaths.src.root.dto.models.model.path,
	});
};

export default createModelsLevelFiles;
