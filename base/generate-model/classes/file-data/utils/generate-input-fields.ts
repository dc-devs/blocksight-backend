import generateInputField from './generate-input-field';
import { IAttributes } from '../../../interfaces';

interface IProps {
	attributes: IAttributes;
}

const generateInputFields = ({ attributes }: IProps) => {
	let data = '';
	const attributeKeys = Object.keys(attributes);

	attributeKeys.forEach((attribute, index) => {
		const isLastInputField = index !== attributeKeys.length - 1;

		data += generateInputField({
			attribute,
			attributes,
			isLastInputField,
		});
	});

	return data;
};

export default generateInputFields;
