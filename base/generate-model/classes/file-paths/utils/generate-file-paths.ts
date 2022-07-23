import { join } from 'path';
import { FileName } from '../enums';
import { IFilePaths, IModelName } from '../../../interfaces';
import { generateRootLevelFilePaths, generateDtoInputsLevelFilePaths } from '.';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateFilePaths = ({ rootPath, modelName }: IProps) => {
	const {
		moduleFilePath,
		serviceFilePath,
		resolverFilePath,
		serviceSpecFilePath,
		resolverSpecFilePath,
	} = generateRootLevelFilePaths({ rootPath, modelName });

	const {
		indexFilePath,
		updateFilePath,
		createFilePath,
		findOneFilePath,
		findAllFilePath,
	} = generateDtoInputsLevelFilePaths({
		rootPath: join(rootPath, FileName.DTO, FileName.INPUTS),
		modelName,
	});

	const paths: IFilePaths = {
		root: {
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
			dto: {
				inputs: {
					index: {
						path: indexFilePath,
					},
					update: {
						path: updateFilePath,
					},
					create: {
						path: createFilePath,
					},
					findAll: {
						path: findAllFilePath,
					},
					findOne: {
						path: findOneFilePath,
					},
				},
			},
		},
	};

	return paths;
};

export default generateFilePaths;
