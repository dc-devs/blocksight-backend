import { join } from 'path';
import { FolderName } from '../../enums';
import { IFolderPathsSrc } from '../../../../interfaces/folder-paths';
import generateSrcRootFolderPath from './generate-src-root-folder-path';

interface IProps {
	modelName: string;
}

const generateSrcFolderPaths = ({ modelName }: IProps): IFolderPathsSrc => {
	const rootFolderPath = generateSrcRootFolderPath({ modelName });
	const enumsFolderPath = join(rootFolderPath, FolderName.ENUMS);
	const dtoFolderPath = join(rootFolderPath, FolderName.DTO);

	const inputsFolderPath = join(dtoFolderPath, FolderName.INPUTS);
	const modelsFolderPath = join(dtoFolderPath, FolderName.MODELS);
	const prismaFolderPath = join(dtoFolderPath, FolderName.PRISMA);

	return {
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
};

export default generateSrcFolderPaths;
