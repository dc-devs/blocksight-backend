import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';
import createInputsLevelFiles from './create-inputs-level-files';
import createModelsLevelFiles from './create-models-level-files';
import createPrismaLevelFiles from './create-prisma-level-files';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createDtoLevelFiles = ({ fileData, filePaths }: IProps) => {
	createInputsLevelFiles({
		fileData,
		filePaths,
	});

	createModelsLevelFiles({
		fileData,
		filePaths,
	});

	createPrismaLevelFiles({
		fileData,
		filePaths,
	});
};

export default createDtoLevelFiles;
