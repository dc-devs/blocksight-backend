import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createInputsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.src.root.dto.inputs.index.data,
		file: filePaths.src.root.dto.inputs.index.path,
	});

	createFile({
		data: fileData.src.root.dto.inputs.create.data,
		file: filePaths.src.root.dto.inputs.create.path,
	});

	createFile({
		data: fileData.src.root.dto.inputs.update.data,
		file: filePaths.src.root.dto.inputs.update.path,
	});

	createFile({
		data: fileData.src.root.dto.inputs.findOne.data,
		file: filePaths.src.root.dto.inputs.findOne.path,
	});

	createFile({
		data: fileData.src.root.dto.inputs.findAll.data,
		file: filePaths.src.root.dto.inputs.findAll.path,
	});
};

export default createInputsLevelFiles;
