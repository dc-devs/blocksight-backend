import generateInputField from './generate-input-field';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	setAllValues?: string;
	attributes: IAttributes;
	autoAddValidation?: boolean;
	setAllFieldsOpional?: boolean;
}

const generateInputFields = ({
	attributes,
	setAllValues,
	autoAddValidation = true,
	setAllFieldsOpional = false,
}: IProps) => {
	let data = '';
	const attributeKeys = Object.keys(attributes);

	attributeKeys.forEach((attribute, index) => {
		const isLastInputField = index !== attributeKeys.length - 1;

		data += generateInputField({
			attribute,
			attributes,
			isLastInputField,
			autoAddValidation,
			customValue: setAllValues,
			isOptional: setAllFieldsOpional,
		});
	});

	return data;
};

export default generateInputFields;
