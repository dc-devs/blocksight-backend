import { IModelName } from '../../../../../../../interfaces/model-name';
import { IFileDataPrisma } from '../../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../../interfaces/model';
import generatePrismaWhereFileData from './generate-file-data/generate-prisma-where-file-data';
import generatePrismaIndexFileData from './generate-file-data/generate-prisma-index-file-data';
import generatePrismaCursorFileData from './generate-file-data/generate-prisma-cursor-file-data';
import generatePrismaOrderFileData from './generate-file-data/generate-prisma-order-file-data';
import generatePrismaModelFileData from './generate-file-data/generate-prisma-model-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generatePrismaLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataPrisma => {
	const indexFileData = generatePrismaIndexFileData({ modelName });

	const cursorFileData = generatePrismaCursorFileData({
		modelName,
		model,
	});

	const orderFileData = generatePrismaOrderFileData({
		modelName,
		model,
	});

	const whereFileData = generatePrismaWhereFileData({
		modelName,
		model,
	});

	const modelFileData = generatePrismaModelFileData({
		modelName,
		model,
	});

	return {
		index: {
			data: indexFileData,
		},
		cursor: {
			data: cursorFileData,
		},
		order: {
			data: orderFileData,
		},
		where: {
			data: whereFileData,
		},
		model: {
			data: modelFileData,
		},
	};
};

export default generatePrismaLevelFileData;
