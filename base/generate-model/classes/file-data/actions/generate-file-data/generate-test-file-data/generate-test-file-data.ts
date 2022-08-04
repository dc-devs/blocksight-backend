import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataTest } from '../../../../../interfaces/file-data';
import generateTestSpecFileData from './root/generate-test-spec-file-data';
import { IModel } from '../../../../../interfaces/model';
import generateEnumsLevelFileData from './enums/generate-enums-level-file-data';
import generateTestsLevelFileData from './tests/generate-tests-level-file-data';
import generateQueriesLevelFileData from './queries/generate-queries-level-file-data';
import generateExpectedObjectsLevelFileData from './expected-objects/generate-expected-objects-level-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateTestFileData = ({ modelName, model }: IProps): IFileDataTest => {
	const tests = generateTestsLevelFileData({
		modelName,
		model,
	});

	const queries = generateQueriesLevelFileData({
		modelName,
		model,
	});

	const enums = generateEnumsLevelFileData({
		modelName,
		model,
	});

	const expectedObjects = generateExpectedObjectsLevelFileData({
		modelName,
		model,
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
