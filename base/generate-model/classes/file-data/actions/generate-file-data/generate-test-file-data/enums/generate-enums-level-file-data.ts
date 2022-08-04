import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestEnums } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';
import generateEnumsErrorMessageFileData from './generate-file-data/generate-enums-error-message-level-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateEnumsLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataTestEnums => {
	const errorMessageFileData = generateEnumsErrorMessageFileData({
		modelName,
		model,
	});

	return {
		errorMessage: {
			data: errorMessageFileData,
		},
	};
};

export default generateEnumsLevelFileData;
