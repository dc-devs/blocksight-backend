import { IFileData } from '../../../../interfaces/file-data';
import { IFilePaths } from '../../../../interfaces/file-paths';
import createDtoLevelFiles from './dto/create-dto-level-files';
import createRootLevelFiles from './root/create-root-level-files';
import createEnumLevelFiles from './enums/create-enum-level-files';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createAllSrcModelFiles = ({ fileData, filePaths }: IProps) => {
	createRootLevelFiles({ fileData, filePaths });
	createDtoLevelFiles({ fileData, filePaths });
	createEnumLevelFiles({ fileData, filePaths });
};

export default createAllSrcModelFiles;
