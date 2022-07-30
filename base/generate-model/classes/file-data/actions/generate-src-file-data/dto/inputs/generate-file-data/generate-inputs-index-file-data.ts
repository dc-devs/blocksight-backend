import { IModelName } from '../../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateInputsIndexFileData = ({ modelName }: IProps) => {
	const data = `import { Update${modelName.singular.pascalCase}Input } from './update-${modelName.singular.paramCase}.input';
import { Create${modelName.singular.pascalCase}Input } from './create-${modelName.singular.paramCase}.input';
import { FindOne${modelName.singular.pascalCase}Input } from './find-one-${modelName.singular.paramCase}.input';
import { FindAll${modelName.plural.pascalCase}Input } from './find-all-${modelName.plural.paramCase}.input';

export {
	Update${modelName.singular.pascalCase}Input,
	Create${modelName.singular.pascalCase}Input,
	FindOne${modelName.singular.pascalCase}Input,
	FindAll${modelName.plural.pascalCase}Input,
};
`;
	return data;
};

export default generateInputsIndexFileData;
