import { IModelName } from '../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateTestSpecFileData = ({ modelName }: IProps) => {
	let data = '';

	data += `import {
	runCreateTests,
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
} from './tests';

describe('${modelName.plural.pascalCase}', () => {
	runFindAllTests();
	runFindOneTests();
	runDeleteTests();
	runUpdateTests();
	runCreateTests();
});
`;

	return data;
};

export default generateTestSpecFileData;
