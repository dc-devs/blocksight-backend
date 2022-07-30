import { generateModelsLevelFileData } from './models';
import { generateInputsLevelFileData } from './inputs';
import { generatePrismaLevelFileData } from './prisma';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataDto } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateDtoLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataDto => {
	const inputs = generateInputsLevelFileData({
		modelName,
		modelAttributes,
	});
	const models = generateModelsLevelFileData({
		modelName,
		modelAttributes,
	});
	const prisma = generatePrismaLevelFileData({
		modelName,
		modelAttributes,
	});

	return {
		inputs,
		models,
		prisma,
	};
};

export default generateDtoLevelFileData;
