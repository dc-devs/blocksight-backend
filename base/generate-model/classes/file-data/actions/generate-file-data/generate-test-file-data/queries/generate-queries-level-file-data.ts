import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestQueries } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateQueriesCreateFileData from './generate-file-data/generate-queries-create-level-file-data';
import generateQueriesDeleteFileData from './generate-file-data/generate-queries-delete-level-file-data';
import generateQueriesUpdateFileData from './generate-file-data/generate-queries-update-level-file-data';
import generateQueriesFindAllFileData from './generate-file-data/generate-queries-find-all-level-file-data';
import generateQueriesFindOneFileData from './generate-file-data/generate-queries-find-one-level-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateQueriesLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTestQueries => {
	const createFileData = generateQueriesCreateFileData({
		modelName,
		modelAttributes,
	});

	const deleteFileData = generateQueriesDeleteFileData({
		modelName,
		modelAttributes,
	});

	const updateFileData = generateQueriesUpdateFileData({
		modelName,
		modelAttributes,
	});

	const findAllFileData = generateQueriesFindAllFileData({
		modelName,
		modelAttributes,
	});

	const findOneFileData = generateQueriesFindOneFileData({
		modelName,
		modelAttributes,
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
