import { Character } from '../../../enums';
import { IAttributes } from '../../../interfaces/model-attribute';
import generateClassValidatorDecorators from './generate-class-validator-decorators';

interface IProps {
	attribute: string;
	isOptional: boolean;
	customValue?: string;
	attributes: IAttributes;
	isLastInputField: boolean;
	autoAddValidation: boolean;
}

const generateInputField = ({
	attribute,
	attributes,
	customValue,
	isOptional = false,
	isLastInputField = false,
	autoAddValidation = true,
}: IProps) => {
	let data = '';
	const attributeProps = attributes[attribute];
	const { typeScriptType, classValidators } = attributeProps;
	const classValidatorDecorators =
		generateClassValidatorDecorators(classValidators);

	if (autoAddValidation) {
		data += `${classValidatorDecorators}`;
	}

	if (isOptional) {
		data += Character.TAB + '@IsOptional()' + Character.LINE_BREAK;
	}

	data += Character.TAB + `@Field({ nullable: true })` + Character.LINE_BREAK;

	data +=
		Character.TAB +
		`${attribute}?: ${customValue || typeScriptType};` +
		Character.LINE_BREAK;

	if (isLastInputField) {
		data += Character.LINE_BREAK;
	}

	return data;
};

export default generateInputField;
