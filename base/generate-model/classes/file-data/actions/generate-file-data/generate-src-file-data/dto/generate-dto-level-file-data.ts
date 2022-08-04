import { generateModelsLevelFileData } from './models';
import { generateInputsLevelFileData } from './inputs';
import { generatePrismaLevelFileData } from './prisma';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataDto } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateDtoLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataDto => {
	const inputs = generateInputsLevelFileData({
		modelName,
		model,
	});
	const models = generateModelsLevelFileData({
		modelName,
		model,
	});
	const prisma = generatePrismaLevelFileData({
		modelName,
		model,
	});

	return {
		inputs,
		models,
		prisma,
	};
};

export default generateDtoLevelFileData;
