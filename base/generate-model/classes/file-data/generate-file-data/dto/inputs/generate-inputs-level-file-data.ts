import generateInputsCreateFileData from './generate-inputs-ceate-file-data';
import generateInputsUpdateFileData from './generate-inputs-update-file-data';
import {
	IModelName,
	IFileDataInputs,
	IModelAttributes,
} from '../../../../../interfaces';

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

	return {
		index: {
			data: '',
		},
		create: {
			data: createFileData,
		},
		update: {
			data: updateFileData,
		},
		findAll: {
			data: '',
		},
		findOne: {
			data: '',
		},
	};
};

export default generateInputsLevelFileData;
