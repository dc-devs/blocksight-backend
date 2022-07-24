import generateInputField from './generate-input-field';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	attributes: IAttributes;
	setAllFieldsOpional?: boolean;
}

const generateInputFields = ({
	attributes,
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
			isOptional: setAllFieldsOpional,
		});
	});

	return data;
};

export default generateInputFields;
