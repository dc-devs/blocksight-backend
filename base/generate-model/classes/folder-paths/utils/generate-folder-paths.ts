import { join } from 'path';
import { FolderName } from '../enums';
import { generateRootFolderPath } from '../utils';
import { IFolderPaths } from '../../../interfaces';

const generateFolderPaths = (modelName: string) => {
	const rootFolderPath = generateRootFolderPath(modelName);
	const enumsFolderPath = join(rootFolderPath, FolderName.ENUMS);
	const dtoFolderPath = join(rootFolderPath, FolderName.DTO);

	const inputsFolderPath = join(dtoFolderPath, FolderName.INPUTS);
	const modelsFolderPath = join(dtoFolderPath, FolderName.MODELS);
	const prismaFolderPath = join(dtoFolderPath, FolderName.PRISMA);

	const paths: IFolderPaths = {
		root: {
			path: rootFolderPath,
			dto: {
				path: dtoFolderPath,
				inputs: { path: inputsFolderPath },
				models: { path: modelsFolderPath },
				prisma: { path: prismaFolderPath },
			},
			enums: {
				path: enumsFolderPath,
			},
		},
	};

	return paths;
};

export default generateFolderPaths;
