import { Character } from '../../../../../../enums';
import { snakeCase, capitalCase } from 'change-case';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IAttributes, IModel } from '../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateEnumVariable = (attribute: string) => {
	const variableName = `${snakeCase(attribute).toUpperCase()}_IS_TAKEN`;
	const variableValue = `${capitalCase(attribute)} is taken`;

	return `${variableName} = '${variableValue}',`;
};

const generateEnumVariables = (attributes: IAttributes) => {
	let variables = ``;

	Object.keys(attributes).forEach((attribute) => {
		const variable = generateEnumVariable(attribute);

		variables += variable;
	});

	return variables;
};

const generateEnumsValidationErrorFileData = ({ modelName, model }: IProps) => {
	let data = ``;
	const uniqueAttributes = model.attributeBundles.unique;
	const { attributes } = uniqueAttributes;
	const enumVariables = generateEnumVariables(attributes);
	const enumName = `${modelName.singular.pascalCase}ValidationError`;

	data += `enum ${enumName} {` + Character.LINE_BREAK;
	data += enumVariables;
	data += `}` + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += `export default ${enumName}` + Character.LINE_BREAK;

	return data;
};

export default generateEnumsValidationErrorFileData;
