import { generateInputsCreateFileData } from '.';
import {
	IModelName,
	IModelAttributes,
	IFileDataInputs,
} from '../../../../../interfaces';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

const generateInputsLevelFileData = ({
	modelName,
	attributes,
}: IProps): IFileDataInputs => {
	const createFileData = generateInputsCreateFileData({
		modelName,
		attributes,
	});

	return {
		index: {
			data: '',
		},
		create: {
			data: createFileData,
		},
		update: {
			data: '',
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
