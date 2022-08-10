import { Character, TypeScriptType } from '../../../../../../../../../enums';
import { IAttributes } from '../../../../../../../../../interfaces/model';

const defaultValues = {
	[TypeScriptType.NUMBER]: 1,
	[TypeScriptType.STRING]: 'Test value',
	[TypeScriptType.BOOLEAN]: true,
};

interface ICustomAttribute {
	[key: string]: any;
}

interface IProps {
	attributes: IAttributes;
	customValues?: ICustomAttribute;
}

const generateInputProperties = ({ attributes, customValues = {} }: IProps) => {
	let data = '';
	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const property = attributeName;
		const valueRaw =
			customValues[attributeName] || defaultValues[typeScriptType];
		const value =
			typeScriptType === TypeScriptType.STRING
				? `'${valueRaw}'`
				: valueRaw;

		data += `${property}: ${value},`;
		data += Character.LINE_BREAK;
	});

	return data;
};

export default generateInputProperties;
