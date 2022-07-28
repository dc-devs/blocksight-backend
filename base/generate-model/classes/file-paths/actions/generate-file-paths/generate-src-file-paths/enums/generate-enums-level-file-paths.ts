import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsEnums } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateEnumsLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsEnums => {

	const indexFilePath = join(rootPath, `${FileName.INDEX}.ts`);
	const nameFilePath = join(rootPath, `${modelName.singular.paramCase}-${FileName.NAME}.${FileName.ENUM}.ts`);
	const validationFilePath = join(rootPath, `${modelName.singular.paramCase}-${FileName.VALIDATION_ERROR}.${FileName.ENUM}.ts`);

	return {
		name: {
			path: nameFilePath,
		},
		validationError: {
			path: validationFilePath,
		},
		index: {
			path: indexFilePath,
		},
	};
};

export default generateEnumsLevelFilePaths;
