import { IFileData } from '../../../interfaces/file-data';
import { IFilePaths } from '../../../interfaces/file-paths';
import createAllSrcModelFiles from './src/create-all-src-model-files';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createAllNewModelFiles = ({ fileData, filePaths }: IProps) => {
	createAllSrcModelFiles({ fileData, filePaths });
};

export default createAllNewModelFiles;
