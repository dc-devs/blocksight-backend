import { join } from 'path';
import { FileName } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IFilePathsSrc } from '../../../../../interfaces/file-paths';
import generateDtoLevelFilePaths from './dto/generate-dto-level-file-paths';
import generateRootLevelFilePaths from './root/generate-root-level-file-paths';
import generateEnumsLevelFilePaths from './enums/generate-enums-level-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateSrcFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsSrc => {
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

	const paths = {
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

export default generateSrcFilePaths;
