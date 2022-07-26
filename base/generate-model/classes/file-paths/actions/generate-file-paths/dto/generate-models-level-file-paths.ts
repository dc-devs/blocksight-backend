import { join } from 'path';
import { FileName } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IFilePathsModels } from '../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateModelsLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsModels => {
	const modelFilePath = join(
		rootPath,
		`${modelName.singular.paramCase}.${FileName.MODEL}.ts`,
	);

	return {
		model: {
			path: modelFilePath,
		},
	};
};

export default generateModelsLevelFilePaths;
