import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const defatulValues = {
	string: 'Updated Value',
	number: 12345,
};

const generateInputValues = ({ model }: IProps) => {
	let data = '';

	const { tests } = model;
	const { update } = tests;
	const { customValues } = update;
	const { attributes } = model.attributeBundles.withoutTimeStamps;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const attributeValue =
			customValues[attributeName] || defatulValues[typeScriptType];

		console.log(attributeName, attributeValue);
		data += `${attributeName}: ${attributeValue},` + Character.LINE_BREAK;
	});

	return data;
};

export default generateInputValues;
