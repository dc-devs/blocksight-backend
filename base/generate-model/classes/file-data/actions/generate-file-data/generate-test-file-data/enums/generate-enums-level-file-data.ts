import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestEnums } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateEnumsErrorMessageFileData from './generate-file-data/generate-enums-error-message-level-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateEnumsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTestEnums => {
	const errorMessageFileData = generateEnumsErrorMessageFileData({
		modelName,
		modelAttributes,
	});

	return {
		errorMessage: {
			data: errorMessageFileData,
		},
	};
};

export default generateEnumsLevelFileData;
