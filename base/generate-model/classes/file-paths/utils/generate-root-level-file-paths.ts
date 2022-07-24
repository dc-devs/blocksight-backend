import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateRootLevelFilePaths = ({ rootPath, modelName }: IProps) => {
	const moduleFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.MODULE}.ts`,
	);

	const resolverFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.RESOLVER}.ts`,
	);

	const resolverSpecFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.RESOLVER}.${FileName.SPEC}.ts`,
	);

	const serviceFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.SERVICE}.ts`,
	);

	const serviceSpecFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.SERVICE}.${FileName.SPEC}.ts`,
	);

	return {
		moduleFilePath,
		serviceFilePath,
		resolverFilePath,
		serviceSpecFilePath,
		resolverSpecFilePath,
	};
};

export default generateRootLevelFilePaths;
