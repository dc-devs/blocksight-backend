import generateModelsModelFileData from './generate-models-model-file-data';
import {
	IModelName,
	IFileDataModels,
	IModelAttributes,
} from '../../../../../interfaces';

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
