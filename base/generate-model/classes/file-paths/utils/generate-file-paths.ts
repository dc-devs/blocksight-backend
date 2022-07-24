import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';
import { IFilePaths } from '../../../interfaces/file-paths';
import generateRootLevelFilePaths from './generate-root-level-file-paths';
import generateDtoInputsLevelFilePaths from './generate-dto-inputs-level-file-paths';
import generateDtoModelsLevelFilePaths from './generate-dto-models-level-file-paths';

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
	const { modelFilePath } = generateDtoModelsLevelFilePaths({
		rootPath: join(rootPath, FileName.DTO, FileName.MODELS),
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
				models: {
					model: {
						path: modelFilePath,
					},
				},
			},
		},
	};

	return paths;
};

export default generateFilePaths;
