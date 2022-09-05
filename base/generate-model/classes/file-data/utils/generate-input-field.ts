import { Character, SpecialType } from '../../../enums';
import { IAttributes } from '../../../interfaces/model';
import generateClassValidatorDecorators from './generate-class-validator-decorators';

interface IProps {
	attribute: string;
	isOptional: boolean;
	customValue?: string;
	attributes: IAttributes;
	isLastInputField: boolean;
	autoAddValidation: boolean;
	customJsonFieldValue?: string | undefined;
}

const generateInputField = ({
	attribute,
	attributes,
	customValue,
	customJsonFieldValue,
	isOptional = false,
	isLastInputField = false,
	autoAddValidation = true,
}: IProps) => {
	let data = '';
	const attributeProps = attributes[attribute];
	const { typeScriptType, classValidators, specialType } = attributeProps;
	const classValidatorDecorators =
		generateClassValidatorDecorators(classValidators);

	if (specialType === SpecialType.JSON) {
		data += isOptional ? `@IsOptional()` : `@IsString()`;
		data += Character.LINE_BREAK;

		data += customValue
			? `@Field({ nullable: true })`
			: `@Field(() => GraphQLJSON, { nullable: true })`;
		data += Character.LINE_BREAK;

		data +=
			`${attribute}?:${
				customValue || customJsonFieldValue || 'Prisma.InputJsonValue'
			};` + Character.LINE_BREAK;
		data += Character.LINE_BREAK;
	} else {
		if (autoAddValidation) {
			data += `${classValidatorDecorators}`;
		}

		if (isOptional) {
			data += Character.TAB + '@IsOptional()' + Character.LINE_BREAK;
		}

		data +=
			Character.TAB + `@Field({ nullable: true })` + Character.LINE_BREAK;

		data +=
			Character.TAB +
			`${attribute}?: ${customValue || typeScriptType};` +
			Character.LINE_BREAK;

		if (isLastInputField) {
			data += Character.LINE_BREAK;
		}
	}

	return data;
};

export default generateInputField;
