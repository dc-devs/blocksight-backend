import IFilePathsModels from './file-paths-models';
import IFilePathsInputs from './file-paths-inputs';
import IFilePathsPrisma from './file-paths-prisma';

interface IFilePathsDto {
	inputs: IFilePathsInputs;
	models: IFilePathsModels;
	prisma: IFilePathsPrisma;
}

export default IFilePathsDto;
