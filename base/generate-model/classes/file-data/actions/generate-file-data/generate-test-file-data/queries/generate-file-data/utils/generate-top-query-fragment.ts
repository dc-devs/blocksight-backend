import { pascalCase } from 'change-case';
import { Character } from '../../../../../../../../enums';

interface IProps {
	modelName: string;
	queryType: string;
	crudOperation: string;
	customInputType?: string;
	customVariableName?: string;
}

const generateTopQueryFragment = ({
	modelName,
	queryType,
	crudOperation,
	customInputType,
	customVariableName,
}: IProps) => {
	let data = '';
	const queryTypeLowerCased = queryType;
	const queryTypeCapitalized = pascalCase(queryType);
	const crudOperationLowerCased = crudOperation;
	const crudOperationCapitalized = pascalCase(crudOperation);
	const defaultInputType = `${crudOperationCapitalized}${modelName}Input`;
	const inputType = customInputType || defaultInputType;
	const defaultVariableName = `${crudOperationLowerCased}${modelName}Input`;
	const variableName = customVariableName || defaultVariableName;

	data += `const ${crudOperation}Query = \`` + Character.LINE_BREAK;
	data +=
		`${queryTypeLowerCased} ${queryTypeCapitalized}($${crudOperationLowerCased}${modelName}Input: ${inputType}!) {` +
		Character.LINE_BREAK;
	data +=
		Character.TAB +
		`${crudOperationLowerCased}${modelName}(${variableName}: $${crudOperationLowerCased}${modelName}Input) {` +
		Character.LINE_BREAK;

	return data;
};

export default generateTopQueryFragment;
