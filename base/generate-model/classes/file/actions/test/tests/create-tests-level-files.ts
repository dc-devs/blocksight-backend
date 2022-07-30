import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createTestsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.test.root.tests.create.data,
		file: filePaths.test.root.tests.create.path,
	});

	createFile({
		data: fileData.test.root.tests.delete.data,
		file: filePaths.test.root.tests.delete.path,
	});

	createFile({
		data: fileData.test.root.tests.findAll.data,
		file: filePaths.test.root.tests.findAll.path,
	});

	createFile({
		data: fileData.test.root.tests.findOne.data,
		file: filePaths.test.root.tests.findOne.path,
	});

	createFile({
		data: fileData.test.root.tests.update.data,
		file: filePaths.test.root.tests.update.path,
	});

	createFile({
		data: fileData.test.root.tests.index.data,
		file: filePaths.test.root.tests.index.path,
	});
};

export default createTestsLevelFiles;
