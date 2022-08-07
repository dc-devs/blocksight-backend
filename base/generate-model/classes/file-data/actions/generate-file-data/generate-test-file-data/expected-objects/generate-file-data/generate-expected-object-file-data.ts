import { pascalCase, paramCase } from 'change-case';
import { Character, Attribute } from '../../../../../../../enums';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateExpectedObjectFileData = ({ model }: IProps) => {
	let data = '';
	const { attributes } = model.attributeBundles.all;

	const topFragment =
		'const expectedObject = expect.objectContaining({' +
		Character.LINE_BREAK;
	const bottomFragment = '});' + Character.LINE_BREAK;
	const exportFragment =
		'export default expectedObject;' + Character.LINE_BREAK;

	data += topFragment;

	data += Character.TAB + 'id: expect.any(Number),' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const property = attributeName;
		let typeExpected = typeScriptType;

		if (
			attributeName === Attribute.CREATED_AT ||
			attributeName === Attribute.UPDATED_AT
		) {
			typeExpected = 'String';
		}

		const value = `expect.any(${pascalCase(typeExpected)})`;

		data += Character.TAB + `${property}: ${value},` + Character.LINE_BREAK;
	});

	data += bottomFragment;
	data += Character.LINE_BREAK;
	data += exportFragment;

	return data;
};

export default generateExpectedObjectFileData;
