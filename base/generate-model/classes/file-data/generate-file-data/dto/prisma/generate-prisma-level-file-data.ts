import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataPrisma } from '../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';
import generatePrismaIndexFileData from './generate-file-data/generate-prisma-index-file-data';
import generatePrismaCursorFileData from './generate-file-data/generate-prisma-cursor-file-data';
import generatePrismaOrderFileData from './generate-file-data/generate-prisma-order-file-data';

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
			data: 'where',
		},
		model: {
			data: 'model',
		},
	};
};

export default generatePrismaLevelFileData;
