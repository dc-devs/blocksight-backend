import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsTestExpectedObjects } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateExpectedObjectsLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsTestExpectedObjects => {
	const expectedObjectFilePath = join(rootPath, `expected-${modelName.singular.paramCase}-object.ts`);

	return {
		expectedObject: {
			path: expectedObjectFilePath,
		},
	};
};

export default generateExpectedObjectsLevelFilePaths;
