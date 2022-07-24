import { Character } from '../../../enums';
import { IModelName, IModelAttributes } from '../../../../../interfaces';
import {
	generateInputField,
	generateClassValidatorImport,
} from '../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateInputsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	const { classValidators, attributes } = modelAttributes.withoutTimeStamps;
	const attributeKeys = Object.keys(attributes);
	const importClassValidators = generateClassValidatorImport({
		classValidators: classValidators,
	});

	let data =
		`import { Field, InputType } from '@nestjs/graphql';` +
		Character.LINE_BREAK;

	data += `${importClassValidators}` + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += `@InputType()` + Character.LINE_BREAK;
	data +=
		`export class Create${modelName.singular.pascalCase}Input {` +
		Character.LINE_BREAK;

	attributeKeys.forEach((attribute, index) => {
		const isLastInputField = index !== attributeKeys.length - 1;

		data += generateInputField({
			attribute,
			attributes,
			isLastInputField,
		});
	});

	data += `};`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateInputsCreateFileData;
