import { join } from 'path';
import { Paths } from '../interfaces';
import { FolderName } from '../enums';
import { generateRootFolderPath } from '../utils';

const generateFolderPaths = (modelNameSnakeCase: string) => {
	const modelRootFolderPath = generateRootFolderPath(modelNameSnakeCase);
	const enumsFolderPath = join(modelRootFolderPath, FolderName.ENUMS);
	const dtoFolderPath = join(modelRootFolderPath, FolderName.DTO);

	const inputsFolderPath = join(dtoFolderPath, FolderName.INPUTS);
	const modelsFolderPath = join(dtoFolderPath, FolderName.MODELS);
	const prismaFolderPath = join(dtoFolderPath, FolderName.PRISMA);

	const paths: Paths = {
		modelRoot: {
			path: modelRootFolderPath,
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
