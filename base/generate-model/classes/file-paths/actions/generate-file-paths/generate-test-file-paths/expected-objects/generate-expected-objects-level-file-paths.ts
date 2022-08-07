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
	const expectedObjectFilePath = join(
		rootPath,
		`expected-${modelName.singular.paramCase}-object.ts`,
	);
	const expectedObjectWithRelationFilePath = join(
		rootPath,
		`expected-${modelName.singular.paramCase}-${FileName.WITH_RELATION}-object.ts`,
	);

	const expectedObjectWithEmptyRelationFilePath = join(
		rootPath,
		`expected-${modelName.singular.paramCase}-${FileName.WITH_EMPTY_RELATION}-object.ts`,
	);

	return {
		expectedObject: {
			path: expectedObjectFilePath,
		},
		expectedObjectWithRelation: {
			path: expectedObjectWithRelationFilePath,
		},
		expectedObjectWithEmptyRelation: {
			path: expectedObjectWithEmptyRelationFilePath,
		},
	};
};

export default generateExpectedObjectsLevelFilePaths;
