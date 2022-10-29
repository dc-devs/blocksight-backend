import { pascalCase, camelCase } from 'change-case';
import {
	Character,
	Attribute,
	TypeScriptType,
} from '../../../../../../../enums';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateExpectedObjectWithEmptyRelationFileData = ({ model }: IProps) => {
	let data = '';
	const { relatedTo, isHasMany, isHasOne, isManyToMany } = model;
	const { attributes } = model.attributeBundles.all;

	const topFragment =
		'const expectedObject = expect.objectContaining({' +
		Character.LINE_BREAK;
	const bottomFragment = '});' + Character.LINE_BREAK;
	const exportFragment =
		'export default expectedObject;' + Character.LINE_BREAK;

	data += topFragment;

	data += Character.TAB + 'id: expect.any(Number),' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const property = attributeName;
		let typeExpected = typeScriptType;

		if (
			attributeName === Attribute.CREATED_AT ||
			attributeName === Attribute.UPDATED_AT ||
			typeScriptType === TypeScriptType.DATE
		) {
			typeExpected = 'String';
		}

		const value = `expect.any(${pascalCase(typeExpected)})`;

		data += Character.TAB + `${property}: ${value},` + Character.LINE_BREAK;
	});

	if (relatedTo) {
		Object.keys(relatedTo).forEach((relatedModel) => {
			const relatedModelSinglularCamel = camelCase(relatedModel).replace(
				/s$/g,
				'',
			);
			const relatedModelPluralCamel = camelCase(relatedModel);

			if (isManyToMany || isHasOne) {
				data +=
					`${relatedModelSinglularCamel}: expect.objectContaining({}),` +
					Character.LINE_BREAK;
			}

			if (isHasMany) {
				data +=
					`${relatedModelPluralCamel}: expect.arrayContaining([]),` +
					Character.LINE_BREAK;
			}
		});

		data += Character.LINE_BREAK;
	}

	data += bottomFragment;
	data += Character.LINE_BREAK;
	data += exportFragment;

	return data;
};

export default generateExpectedObjectWithEmptyRelationFileData;
