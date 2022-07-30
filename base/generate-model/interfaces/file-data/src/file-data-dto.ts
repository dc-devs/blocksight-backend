import IFileDataInputs from './file-data-inputs';
import IFileDataModels from './file-data-models';
import IFileDataPrisma from './file-data-prisma';

interface IFileDataDto {
	inputs: IFileDataInputs;
	models: IFileDataModels;
	prisma: IFileDataPrisma;
}

export default IFileDataDto;
