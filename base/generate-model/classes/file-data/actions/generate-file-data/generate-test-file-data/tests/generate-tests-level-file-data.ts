import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestTests } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';
import generateTestsIndexFileData from './generate-file-data/generate-tests-index-level-file-data';
import generateTestsCreateFileData from './generate-file-data/generate-tests-create-level-file-data';
import generateTestsDeleteFileData from './generate-file-data/generate-tests-delete-level-file-data';
import generateTestsUpdateFileData from './generate-file-data/generate-tests-update-level-file-data';
import generateTestsFindAllFileData from './generate-file-data/generate-tests-find-all-level-file-data';
import generateTestsFindOneFileData from './generate-file-data/generate-tests-find-one-level-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateTestsLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataTestTests => {
	const indexFileData = generateTestsIndexFileData({
		modelName,
	});

	const createFileData = generateTestsCreateFileData({
		modelName,
		model,
	});

	const deleteFileData = generateTestsDeleteFileData({
		modelName,
		model,
	});

	const updateFileData = generateTestsUpdateFileData({
		modelName,
		model,
	});

	const findAllFileData = generateTestsFindAllFileData({
		modelName,
		model,
	});

	const findOneFileData = generateTestsFindOneFileData({
		modelName,
		model,
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
