import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createRootLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.test.root.testSpec.data,
		file: filePaths.test.root.testSpec.path,
	});
};

export default createRootLevelFiles;
