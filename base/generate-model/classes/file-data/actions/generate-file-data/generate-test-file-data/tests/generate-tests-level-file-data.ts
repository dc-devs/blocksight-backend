import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestTests } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateTestsIndexFileData from './generate-file-data/generate-tests-index-level-file-data';
import generateTestsCreateFileData from './generate-file-data/generate-tests-create-level-file-data';
import generateTestsDeleteFileData from './generate-file-data/generate-tests-delete-level-file-data';
import generateTestsUpdateFileData from './generate-file-data/generate-tests-update-level-file-data';
import generateTestsFindAllFileData from './generate-file-data/generate-tests-find-all-level-file-data';
import generateTestsFindOneFileData from './generate-file-data/generate-tests-find-one-level-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTestTests => {
	const indexFileData = generateTestsIndexFileData({
		modelName,
	});

	const createFileData = generateTestsCreateFileData({
		modelName,
		modelAttributes,
	});

	const deleteFileData = generateTestsDeleteFileData({
		modelName,
		modelAttributes,
	});

	const updateFileData = generateTestsUpdateFileData({
		modelName,
		modelAttributes,
	});

	const findAllFileData = generateTestsFindAllFileData({
		modelName,
		modelAttributes,
	});

	const findOneFileData = generateTestsFindOneFileData({
		modelName,
		modelAttributes,
	});

	return {
		index: {
			data: indexFileData,
		},
		create: {
			data: createFileData,
		},
		delete: {
			data: deleteFileData,
		},
		findAll: {
			data: findAllFileData,
		},
		findOne: {
			data: findOneFileData,
		},
		update: {
			data: updateFileData,
		},
	};
};

export default generateTestsLevelFileData;
