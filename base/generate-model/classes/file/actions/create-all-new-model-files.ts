import { IFileData } from '../../../interfaces/file-data';
import { IFilePaths } from '../../../interfaces/file-paths';
import {
	createDtoLevelFiles,
	createRootLevelFiles,
	createEnumLevelFiles,
} from './create-new-model-files';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createAllNewModelFiles = ({ fileData, filePaths }: IProps) => {
	createRootLevelFiles({ fileData, filePaths });
	createDtoLevelFiles({ fileData, filePaths });
	createEnumLevelFiles({ fileData, filePaths });
};

export default createAllNewModelFiles;
