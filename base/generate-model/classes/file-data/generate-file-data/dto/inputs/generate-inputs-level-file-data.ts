import { generateInputsCreateFileData } from '.';
import {
	IModelName,
	IFileDataInputs,
} from '../../../../../interfaces';

interface IProps {
	modelName: IModelName;
	modelAttributes: any;
}

const generateInputsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataInputs => {
	const createFileData = generateInputsCreateFileData({
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
