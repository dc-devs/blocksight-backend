import { Character } from '../enums';
import { IAttributes } from '../../../interfaces';
import generateClassValidatorDecorators from './generate-class-validator-decorators';

interface IProps {
	attribute: string;
	isOptional: boolean;
	attributes: IAttributes;
	isLastInputField: boolean;
}

const generateInputField = ({
	attribute,
	attributes,
	isOptional = false,
	isLastInputField = false,
}: IProps) => {
	let data = '';
	const attributeProps = attributes[attribute];
	const { typeScriptType, classValidators } = attributeProps;
	const classValidatorDecorators =
		generateClassValidatorDecorators(classValidators);

	data += `${classValidatorDecorators}`;

	if (isOptional) {
		data += Character.TAB + '@IsOptional()' + Character.LINE_BREAK;
	}

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
