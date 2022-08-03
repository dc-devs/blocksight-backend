import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateEnumsErrorMessageFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const errorBase = 'must be a';
	const errorTail = 'conforming to the specified constraints';
	const { attributes } = modelAttributes.withoutTimeStamps;
	const topFragment = 'const enum ErrorMessage {' + Character.LINE_BREAK;
	const bottomFragment = '}' + Character.LINE_BREAK;
	const exportFragment =
		'export default ErrorMessage;' + Character.LINE_BREAK;

	data += topFragment;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const value = `${attributeName} ${errorBase} ${typeScriptType} ${errorTail}`;
		const property = snakeCase(
			`${attributeName} ${errorBase} ${typeScriptType}`,
		).toUpperCase();
		data +=
			Character.TAB + `${property} = '${value}',` + Character.LINE_BREAK;
	});

	data += bottomFragment;

	data += exportFragment;

	return data;
};

export default generateEnumsErrorMessageFileData;
