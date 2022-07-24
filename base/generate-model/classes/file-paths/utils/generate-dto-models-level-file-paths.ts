import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateDtoModelsLevelFilePaths = ({ rootPath, modelName }: IProps) => {
	const modelFilePath = join(
		rootPath,
		`${modelName.singular.paramCase}.${FileName.MODEL}.ts`,
	);

	return {
		modelFilePath,
	};
};

export default generateDtoModelsLevelFilePaths;
