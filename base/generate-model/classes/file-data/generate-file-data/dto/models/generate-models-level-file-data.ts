import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataModels } from '../../../../../interfaces/file-data';
import generateModelsModelFileData from './generate-file/generate-models-model-file-data';
import {  IModelAttributes } from '../../../../../interfaces/model-attribute';

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
