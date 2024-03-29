import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createExpectedObjectsLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.test.root.expectedObjects.expectedObject.data,
		file: filePaths.test.root.expectedObjects.expectedObject.path,
	});

	createFile({
		data: fileData.test.root.expectedObjects.expectedObjectWithRelation
			.data,
		file: filePaths.test.root.expectedObjects.expectedObjectWithRelation
			.path,
	});

	createFile({
		data: fileData.test.root.expectedObjects.expectedObjectWithEmptyRelation
			.data,
		file: filePaths.test.root.expectedObjects
			.expectedObjectWithEmptyRelation.path,
	});
};

export default createExpectedObjectsLevelFiles;
