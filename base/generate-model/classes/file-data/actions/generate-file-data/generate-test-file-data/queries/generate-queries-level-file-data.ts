import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestQueries } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';
import generateQueriesCreateFileData from './generate-file-data/generate-queries-create-level-file-data';
import generateQueriesDeleteFileData from './generate-file-data/generate-queries-delete-level-file-data';
import generateQueriesUpdateFileData from './generate-file-data/generate-queries-update-level-file-data';
import generateQueriesFindAllFileData from './generate-file-data/generate-queries-find-all-level-file-data';
import generateQueriesFindOneFileData from './generate-file-data/generate-queries-find-one-level-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateQueriesLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataTestQueries => {
	const createFileData = generateQueriesCreateFileData({
		modelName,
		model,
	});

	const deleteFileData = generateQueriesDeleteFileData({
		modelName,
		model,
	});

	const updateFileData = generateQueriesUpdateFileData({
		modelName,
		model,
	});

	const findAllFileData = generateQueriesFindAllFileData({
		modelName,
		model,
	});

	const findOneFileData = generateQueriesFindOneFileData({
		modelName,
		model,
	});

	return {
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

export default generateQueriesLevelFileData;
