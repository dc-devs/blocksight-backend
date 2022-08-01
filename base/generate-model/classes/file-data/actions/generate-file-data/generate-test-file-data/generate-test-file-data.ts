import { IModelName } from '../../../../../interfaces/model-name';
import { IFileDataTest } from '../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';
import generateTestsLevelFileData from './tests/generate-tests-level-file-data';
import generateQueriesLevelFileData from './queries/generate-queries-level-file-data';

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

	const paths = {
		root: {
			enums: {
				errorMessage: {
					data: 'errorMessage',
				},
			},
			expectedObjects: {
				expectedObject: {
					data: 'expectedObject',
				},
			},
			queries,
			tests,
		},
	};

	return paths;
};

export default generateTestFileData;
