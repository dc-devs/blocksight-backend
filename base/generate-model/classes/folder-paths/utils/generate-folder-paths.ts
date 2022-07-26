import { join } from 'path';
import { FolderName } from '../enums';
import { generateRootFolderPath } from '../utils';
import { IFolderPaths } from '../../../interfaces/folder-paths';

interface IProps {
	modelName: string;
}

const generateFolderPaths = ({ modelName }: IProps) => {
	const rootFolderPath = generateRootFolderPath({ modelName });
	const enumsFolderPath = join(rootFolderPath, FolderName.ENUMS);
	const dtoFolderPath = join(rootFolderPath, FolderName.DTO);

	const inputsFolderPath = join(dtoFolderPath, FolderName.INPUTS);
	const modelsFolderPath = join(dtoFolderPath, FolderName.MODELS);
	const prismaFolderPath = join(dtoFolderPath, FolderName.PRISMA);

	const paths: IFolderPaths = {
		src: {
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
		},
		test: {},
		// TODO: Refactor src files into its own folder,
		// Finish creating test Fodlers / update interfaces as they root migh tbe off..
	};

	return paths;
};

export default generateFolderPaths;
