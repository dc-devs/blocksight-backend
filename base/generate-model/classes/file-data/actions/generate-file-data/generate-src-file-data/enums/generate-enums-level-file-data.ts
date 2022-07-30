import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataEnums } from '../../../../../../interfaces/file-data';
import generateEnumsIndexFileData from './generate-enums-index-level-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateEnumsValidationErrorDataFileData from './generate-enums-validation-error-level-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateEnumsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataEnums => {
	const indexData = generateEnumsIndexFileData({
		modelName,
	});

	const validationErrorData = generateEnumsValidationErrorDataFileData({
		modelName,
		modelAttributes,
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
