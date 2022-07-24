import { generateClassValidatorImport } from '../../../utils';
import { IModelName, IModelAttributes } from '../../../../../interfaces';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateClassValidatorDecorators = (classValidators: string[]) => {
	let classValidatorDecorators = ``;

	classValidators.forEach((classValidator) => {
		classValidatorDecorators += `\t@${classValidator}()` + '\n';
	});

	return classValidatorDecorators;
};

const generateInputField = ({
	index,
	attribute,
	attributes,
	filteredAttributes,
}) => {
	let data = '';
	const attributeProps = attributes[attribute];
	const { typeScriptType, classValidators } = attributeProps;
	const classValidatorDecorators =
		generateClassValidatorDecorators(classValidators);

	data += `${classValidatorDecorators}`;
	data += `\t@Field({ nullable: true })\n`;
	data += `\t${attribute}?: ${typeScriptType};\n`;

	if (index !== filteredAttributes.length - 1) {
		data += `\n`;
	}

	return data;
};

const generateInputsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	const { classValidatorsForAttrs, attributes } = modelAttributes;
	const filteredAttributes = Object.keys(attributes).filter((attribute) => {
		return attribute !== 'createdAt' && attribute !== 'updatedAt';
	});
	const importClassValidators = generateClassValidatorImport({
		classValidators: classValidatorsForAttrs,
	});

	let data = `import { Field, InputType } from '@nestjs/graphql';` + '\n';

	data += `${importClassValidators}` + '\n';
	data += `\n`;
	data += `@InputType()` + '\n';
	data += `export class Create${modelName.singular.pascalCase}Input {` + '\n';

	filteredAttributes.forEach((attribute, index) => {
		data += generateInputField({
			index,
			attribute,
			attributes,
			filteredAttributes,
		});
	});

	data += `};\n`;

	return data;
};

export default generateInputsCreateFileData;
