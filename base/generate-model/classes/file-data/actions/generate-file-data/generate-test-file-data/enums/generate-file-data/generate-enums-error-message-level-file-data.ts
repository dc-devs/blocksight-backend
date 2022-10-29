import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateEnumsErrorMessageFileData = ({ model }: IProps) => {
	let data = '';
	const errorBase = 'must be a';
	const { attributes } = model.attributeBundles.withoutTimeStamps;
	const topFragment = 'const enum ErrorMessage {' + Character.LINE_BREAK;
	const bottomFragment = '}' + Character.LINE_BREAK;
	const exportFragment =
		'export default ErrorMessage;' + Character.LINE_BREAK;

	data += topFragment;

	data +=
		`DELETE_RECORD_NOT_FOUND = 'Record to delete does not exist.',` +
		Character.LINE_BREAK;

	data +=
		`UPDATE_RECORD_NOT_FOUND = 'Record to update not found.',` +
		Character.LINE_BREAK;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const value = `${attributeName} ${errorBase} ${typeScriptType}`;
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
