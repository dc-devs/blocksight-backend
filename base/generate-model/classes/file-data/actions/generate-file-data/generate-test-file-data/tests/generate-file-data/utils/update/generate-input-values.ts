import { Character, TypeScriptType } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const defaultValues = {
	[TypeScriptType.NUMBER]: 1,
	[TypeScriptType.STRING]: 'Updated Test value',
	[TypeScriptType.BOOLEAN]: true,
	[TypeScriptType.DATE]: new Date().toISOString(),
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
			defaultValues[typeScriptType];
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
