import { join } from 'path';
import { FileName } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IFilePathsDto } from '../../../../../interfaces/file-paths';
import generateInputLevelFilePaths from './generate-inputs-level-file-paths';
import generateModelsLevelFilePaths from './generate-models-level-file-paths';
import generatePrismaLevelFilePaths from './generate-prisma-level-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateDtoLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsDto => {
	const inputs = generateInputLevelFilePaths({
		modelName,
		rootPath: join(rootPath, FileName.INPUTS),
	});
	
	const models = generateModelsLevelFilePaths({
		modelName,
		rootPath: join(rootPath, FileName.MODELS),
	});
	
	const prisma = generatePrismaLevelFilePaths({
		modelName,
		rootPath: join(rootPath, FileName.PRISMA),
	});

	return {
		inputs,
		models,
		prisma,
	};
};

export default generateDtoLevelFilePaths;
