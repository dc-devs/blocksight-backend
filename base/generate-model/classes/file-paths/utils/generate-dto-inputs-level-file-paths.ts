import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateDtoInputsLevelFilePaths = ({ rootPath, modelName }: IProps) => {
	const indexFilePath = join(rootPath, `${FileName.INDEX}.ts`);

	const createFilePath = join(
		rootPath,
		`${FileName.CREATE}-${modelName.singular.paramCase}.${FileName.INPUT}.ts`,
	);

	const updateFilePath = join(
		rootPath,
		`${FileName.UPDATE}-${modelName.singular.paramCase}.${FileName.INPUT}.ts`,
	);

	const findOneFilePath = join(
		rootPath,
		`${FileName.FIND_ONE}-${modelName.singular.paramCase}.${FileName.INPUT}.ts`,
	);

	const findAllFilePath = join(
		rootPath,
		`${FileName.FIND_ALL}-${modelName.plural.paramCase}.${FileName.INPUT}.ts`,
	);

	return {
		indexFilePath,
		createFilePath,
		updateFilePath,
		findOneFilePath,
		findAllFilePath,
	};
};

export default generateDtoInputsLevelFilePaths;
