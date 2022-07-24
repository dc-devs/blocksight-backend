import { createFile } from '../utils';
import { IFileData, IFilePaths } from '../../../interfaces';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createDtoInputsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: '',
		file: filePaths.root.dto.inputs.index.path,
	});

	createFile({
		data: fileData.root.dto.inputs.create.data,
		file: filePaths.root.dto.inputs.create.path,
	});

	createFile({
		data: '',
		file: filePaths.root.dto.inputs.update.path,
	});

	createFile({
		data: '',
		file: filePaths.root.dto.inputs.findOne.path,
	});

	createFile({
		data: '',
		file: filePaths.root.dto.inputs.findAll.path,
	});
};

export default createDtoInputsLevelFiles;
