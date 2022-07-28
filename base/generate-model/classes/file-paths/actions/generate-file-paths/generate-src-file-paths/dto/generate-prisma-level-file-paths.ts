import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsPrisma } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generatePrismaLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsPrisma => {
	const cursorFilePath = join(
		rootPath,
		`${modelName.singular.paramCase}-${FileName.CURSOR}.${FileName.INPUT}.ts`,
	);

	const orderByFilePath = join(
		rootPath,
		`${modelName.singular.paramCase}-${FileName.ORDER_BY}.${FileName.INPUT}.ts`,
	);
	
	const modelFilePath = join(
		rootPath,
		`${modelName.singular.paramCase}.${FileName.INPUT}.ts`,
	);

	const indexFilePath = join(rootPath, `${FileName.INDEX}.ts`);

	return {
		cursor: {
			path: cursorFilePath,
		},
		order: {
			path: orderByFilePath,
		},
		where: {
			path: indexFilePath,
		},
		model: {
			path: modelFilePath,
		},
		index: {
			path: indexFilePath,
		},
	};
};

export default generatePrismaLevelFilePaths;
