import { Character, TypeScriptType } from '../../../../../../../../../enums';
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

	const customValues = model?.tests?.update?.customValues;
	const { attributes } = model.attributeBundles.withoutTimeStamps;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const attributeValueRaw =
			(customValues && customValues[attributeName]) ||
			defatulValues[typeScriptType];
		const attributeValue =
			typeScriptType === TypeScriptType.STRING ||
			typeScriptType === TypeScriptType.DATE
				? `'${attributeValueRaw}'`
				: attributeValueRaw;

		data += `${attributeName}: ${attributeValue},` + Character.LINE_BREAK;
	});

	return data;
};

export default generateInputValues;
