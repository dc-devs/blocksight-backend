import { IFileDataModels } from '../../../../../interfaces/file-data';
import { IModelName, IModelAttributes } from '../../../../../interfaces';
import generateModelsModelFileData from './generate-models-model-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateInputsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataModels => {
	const modelFileData = generateModelsModelFileData({
		modelName,
		modelAttributes,
	});

	return {
		model: {
			data: modelFileData,
		},
	};
};

export default generateInputsLevelFileData;
