import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createTestsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: '',
		file: filePaths.test.root.tests.create.path,
	});

	createFile({
		data: '',
		file: filePaths.test.root.tests.delete.path,
	});

	createFile({
		data: '',
		file: filePaths.test.root.tests.findAll.path,
	});

	createFile({
		data: '',
		file: filePaths.test.root.tests.findOne.path,
	});

	createFile({
		data: '',
		file: filePaths.test.root.tests.update.path,
	});
	
	createFile({
		data: '',
		file: filePaths.test.root.tests.index.path,
	});
};

export default createTestsLevelFiles;
