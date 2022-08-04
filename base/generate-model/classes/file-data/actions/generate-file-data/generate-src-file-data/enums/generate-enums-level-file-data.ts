import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataEnums } from '../../../../../../interfaces/file-data';
import generateEnumsIndexFileData from './generate-enums-index-level-data';
import { IModel } from '../../../../../../interfaces/model';
import generateEnumsValidationErrorDataFileData from './generate-enums-validation-error-level-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateEnumsLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataEnums => {
	const indexData = generateEnumsIndexFileData({
		modelName,
	});

	const validationErrorData = generateEnumsValidationErrorDataFileData({
		modelName,
		model,
	});

	return {
		index: {
			data: indexData,
		},
		validationError: {
			data: validationErrorData,
		},
	};
};

export default generateEnumsLevelFileData;
