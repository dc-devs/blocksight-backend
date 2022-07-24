import { Character } from '../enums';
import generateClassValidatorDecorators from './generate-class-validator-decorators';

const generateInputField = ({ attribute, attributes, isLastInputField }) => {
	let data = '';
	const attributeProps = attributes[attribute];
	const { typeScriptType, classValidators } = attributeProps;
	const classValidatorDecorators =
		generateClassValidatorDecorators(classValidators);

	data += `${classValidatorDecorators}`;
	data += Character.TAB + `@Field({ nullable: true })` + Character.LINE_BREAK;
	data +=
		Character.TAB +
		`${attribute}?: ${typeScriptType};` +
		Character.LINE_BREAK;

	if (isLastInputField) {
		data += Character.LINE_BREAK;
	}

	return data;
};

export default generateInputField;
