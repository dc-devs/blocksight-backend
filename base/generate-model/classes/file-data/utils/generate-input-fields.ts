import { ClassValidator } from '../enums';
import { Character } from '../../../enums';
import generateInputField from './generate-input-field';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IId {
	addIsOptional?: boolean;
	addClassValidation?: boolean;
	value?: string;
}

interface IProps {
	id?: IId;
	setAllValues?: string;
	attributes: IAttributes;
	autoAddValidation?: boolean;
	setAllFieldsOpional?: boolean;
}

const generateIdField = (id: IId) => {
	if (id) {
		let idField = ``;
		let fieldValue = id.value || 'number';

		if (id.addIsOptional) {
			idField +=
				Character.TAB +
				`@${ClassValidator.IS_OPIONAL}()` +
				Character.LINE_BREAK;
		}

		if (id.addClassValidation) {
			idField +=
				Character.TAB +
				`@${ClassValidator.IS_NUMBER}()` +
				Character.LINE_BREAK;
		}

		idField +=
			Character.TAB + `@Field({ nullable: true })` + Character.LINE_BREAK;

		idField += Character.TAB + `id?: ${fieldValue};` + Character.LINE_BREAK;

		idField += Character.LINE_BREAK;

		return idField;
	}
};

const generateInputFields = ({
	id,
	attributes,
	setAllValues,
	autoAddValidation = true,
	setAllFieldsOpional = false,
}: IProps) => {
	let data = '';
	const attributeKeys = Object.keys(attributes);

	if (id) {
		const idField = generateIdField(id);
		data += idField;
	}

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
