import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsTestEnums } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateEnumsLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsTestEnums => {
	const errorMessageFilePath = join(rootPath, `${FileName.ERROR_MESSAGE}.ts`);

	return {
		errorMessage: {
			path: errorMessageFilePath,
		},
	};
};

export default generateEnumsLevelFilePaths;
