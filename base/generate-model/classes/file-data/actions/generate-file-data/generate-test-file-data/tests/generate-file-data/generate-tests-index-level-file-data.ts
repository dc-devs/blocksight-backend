import { IModelName } from '../../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateTestsIndexFileData = ({ modelName }: IProps) => {
	let data = `import runCreateTests from './${modelName.plural.paramCase}.create';
import runUpdateTests from './${modelName.plural.paramCase}.update';
import runDeleteTests from './${modelName.plural.paramCase}.delete';
import runFindAllTests from './${modelName.plural.paramCase}.find-all';
import runFindOneTests from './${modelName.plural.paramCase}.find-one';

export {
	runCreateTests,
	runUpdateTests,
	runDeleteTests,
	runFindAllTests,
	runFindOneTests,
};
`;

	return data;
};

export default generateTestsIndexFileData;
