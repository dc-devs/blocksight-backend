import { pascalCase } from 'change-case';
import { Character } from '../../../../../../../../enums';

interface IProps {
	modelName: string;
	queryType: string;
	crudOperation: string;
}

const generateTopQueryFragment = ({
	modelName,
	queryType,
	crudOperation,
}: IProps) => {
	let data = '';
	const queryTypeLowerCased = queryType;
	const queryTypeCapitalized = pascalCase(queryType);
	const crudOperationLowerCased = crudOperation;
	const crudOperationCapitalized = pascalCase(crudOperation);

	data += `const ${crudOperation}Query = \`` + Character.LINE_BREAK;
	data +=
		`${queryTypeLowerCased} ${queryTypeCapitalized}($${crudOperationLowerCased}${modelName}Input: ${crudOperationCapitalized}${modelName}Input!) {` +
		Character.LINE_BREAK;
	data +=
		Character.TAB +
		`${crudOperationLowerCased}${modelName}(${crudOperationLowerCased}${modelName}Input: $${crudOperationLowerCased}${modelName}Input) {` +
		Character.LINE_BREAK;

	return data;
};

export default generateTopQueryFragment;
