import { IModelName } from '../../../../../../../interfaces/model-name';
import { IFileDataInputs } from '../../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';
import generateInputsIndexFileData from './generate-file-data/generate-inputs-index-file-data';
import generateInputsCreateFileData from './generate-file-data/generate-inputs-ceate-file-data';
import generateInputsUpdateFileData from './generate-file-data/generate-inputs-update-file-data';
import generateInputsFindAllFileData from './generate-file-data/generate-inputs-find-all-file-data';
import generateInputsFindOneFileData from './generate-file-data/generate-inputs-find-one-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateInputsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataInputs => {
	const createFileData = generateInputsCreateFileData({
		modelName,
		modelAttributes,
	});
	const updateFileData = generateInputsUpdateFileData({
		modelName,
		modelAttributes,
	});
	const indexFileData = generateInputsIndexFileData({
		modelName,
	});
	const findAllFileData = generateInputsFindAllFileData({
		modelName,
	});
	const findOneFileData = generateInputsFindOneFileData({
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
		update: {
			data: updateFileData,
		},
		findAll: {
			data: findAllFileData,
		},
		findOne: {
			data: findOneFileData,
		},
	};
};

export default generateInputsLevelFileData;
