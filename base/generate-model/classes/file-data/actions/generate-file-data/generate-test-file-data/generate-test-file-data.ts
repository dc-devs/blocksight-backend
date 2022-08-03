import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataTest } from '../../../../../interfaces/file-data';
import generateTestSpecFileData from './root/generate-test-spec-file-data';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';
import generateEnumsLevelFileData from './enums/generate-enums-level-file-data';
import generateTestsLevelFileData from './tests/generate-tests-level-file-data';
import generateQueriesLevelFileData from './queries/generate-queries-level-file-data';
import generateExpectedObjectsLevelFileData from './expected-objects/generate-expected-objects-level-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTest => {
	const tests = generateTestsLevelFileData({
		modelName,
		modelAttributes,
	});

	const queries = generateQueriesLevelFileData({
		modelName,
		modelAttributes,
	});

	const enums = generateEnumsLevelFileData({
		modelName,
		modelAttributes,
	});

	const expectedObjects = generateExpectedObjectsLevelFileData({
		modelName,
		modelAttributes,
	});

	const testSpecFileData = generateTestSpecFileData({
		modelName,
	});

	const paths = {
		root: {
			testSpec: {
				data: testSpecFileData,
			},
			tests,
			enums,
			queries,
			expectedObjects,
		},
	};

	return paths;
};

export default generateTestFileData;
