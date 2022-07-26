import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';
import { IFilePaths } from '../../../interfaces/file-paths';
import {
	generateRootLevelFilePaths,
	generateDtoLevelFilePaths,
	generateEnumsLevelFilePaths,
} from './generate-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateAllFilePaths = ({ rootPath, modelName }: IProps) => {
	const {
		moduleFilePath,
		serviceFilePath,
		resolverFilePath,
		serviceSpecFilePath,
		resolverSpecFilePath,
	} = generateRootLevelFilePaths({ rootPath, modelName });

	const dto = generateDtoLevelFilePaths({
		rootPath: join(rootPath, FileName.DTO),
		modelName,
	});

	const enums = generateEnumsLevelFilePaths({
		rootPath: join(rootPath, FileName.ENUMS),
		modelName,
	});

	const paths: IFilePaths = {
		root: {
			dto,
			enums,
			module: {
				path: moduleFilePath,
			},
			resolver: {
				path: resolverFilePath,
			},
			resolverSpec: {
				path: resolverSpecFilePath,
			},
			service: {
				path: serviceFilePath,
			},
			serviceSpec: {
				path: serviceSpecFilePath,
			},
		},
	};

	return paths;
};

export default generateAllFilePaths;
