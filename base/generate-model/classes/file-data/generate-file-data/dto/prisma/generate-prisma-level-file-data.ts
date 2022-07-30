import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataPrisma } from '../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';
import generatePrismaWhereFileData from './generate-file-data/generate-prisma-where-file-data';
import generatePrismaIndexFileData from './generate-file-data/generate-prisma-index-file-data';
import generatePrismaCursorFileData from './generate-file-data/generate-prisma-cursor-file-data';
import generatePrismaOrderFileData from './generate-file-data/generate-prisma-order-file-data';
import generatePrismaModelFileData from './generate-file-data/generate-prisma-model-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generatePrismaLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataPrisma => {
	const indexFileData = generatePrismaIndexFileData({ modelName });

	const cursorFileData = generatePrismaCursorFileData({
		modelName,
		modelAttributes,
	});

	const orderFileData = generatePrismaOrderFileData({
		modelName,
		modelAttributes,
	});

	const whereFileData = generatePrismaWhereFileData({
		modelName,
		modelAttributes,
	});

	const modelFileData = generatePrismaModelFileData({
		modelName,
		modelAttributes,
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
