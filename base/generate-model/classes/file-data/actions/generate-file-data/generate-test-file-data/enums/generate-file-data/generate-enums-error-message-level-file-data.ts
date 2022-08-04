import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateEnumsErrorMessageFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const errorBase = 'must be a';
	const errorTail = 'conforming to the specified constraints';
	const { attributes } = model.attributeBundles.withoutTimeStamps;
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
