import { IModelName } from '../../../../../../../interfaces/model-name';
import { IFileDataModels } from '../../../../../../../interfaces/file-data';
import generateModelsModelFileData from './generate-file-data/generate-models-model-file-data';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateInputsLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataModels => {
	const modelFileData = generateModelsModelFileData({
		modelName,
		model,
	});

	return {
		model: {
			data: modelFileData,
		},
	};
};

export default generateInputsLevelFileData;
