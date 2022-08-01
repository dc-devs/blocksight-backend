import { ClassValidator } from '../enums';
import { IRelatedTo } from '../../../interfaces/config';
import generateInputField from './generate-input-field';
import { Character, RelationType } from '../../../enums';
import { IAttributes } from '../../../interfaces/model-attribute';

interface IId {
	addIsOptional?: boolean;
	addClassValidation?: boolean;
	value?: string;
}

interface IProps {
	id?: IId;
	setAllValues?: string;
	relatedTo?: IRelatedTo;
	attributes: IAttributes;
	relationType?: RelationType;
	autoAddValidation?: boolean;
	addRelationalFields?: boolean;
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
	relatedTo,
	relationType,
	addRelationalFields = false,
	autoAddValidation = true,
	setAllFieldsOpional = false,
}: IProps) => {
	let data = '';
	const attributeKeys = Object.keys(attributes);

	if (id) {
		const idField = generateIdField(id);
		data += idField;
	}

	if (addRelationalFields && relationType === RelationType.MANY_TO_MANY) {
		if (relatedTo) {
			Object.keys(relatedTo).forEach((modelName) => {
				const modelNameLower = modelName.toLowerCase();

				data +=
					`@Field(() => ${modelName}, { nullable: true })` +
					Character.LINE_BREAK;
				data +=
					`${modelNameLower}?: ${modelName};` + Character.LINE_BREAK;
				data += Character.LINE_BREAK;
			});
		}
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
