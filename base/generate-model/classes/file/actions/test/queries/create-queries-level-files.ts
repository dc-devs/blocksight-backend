import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createQueriesLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.test.root.queries.create.data,
		file: filePaths.test.root.queries.create.path,
	});

	createFile({
		data: fileData.test.root.queries.delete.data,
		file: filePaths.test.root.queries.delete.path
	});
	
	createFile({
		data: fileData.test.root.queries.findAll.data,
		file: filePaths.test.root.queries.findAll.path
	});
	
	createFile({
		data: fileData.test.root.queries.findOne.data,
		file: filePaths.test.root.queries.findOne.path
	});
	
	createFile({
		data: fileData.test.root.queries.update.data,
		file: filePaths.test.root.queries.update.path
	});
};

export default createQueriesLevelFiles;
