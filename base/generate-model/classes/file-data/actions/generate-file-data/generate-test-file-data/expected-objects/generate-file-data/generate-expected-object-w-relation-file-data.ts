import { pascalCase, paramCase, camelCase } from 'change-case';
import { Character, Attribute,	TypeScriptType, } from '../../../../../../../enums';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateExpectedObjectWithRelationFileData = ({ model }: IProps) => {
	let data = '';
	const { relatedTo, isHasMany, isHasOne, isManyToMany } = model;
	const { attributes } = model.attributeBundles.all;

	if (relatedTo) {
		Object.keys(relatedTo).forEach((relatedModel) => {
			const relatedModelSinglePascal = pascalCase(relatedModel).replace(
				/s$/g,
				'',
			);
			const relatedModelPluralParam = paramCase(relatedModel);
			const relatedModelSinglularParam = paramCase(relatedModel).replace(
				/s$/g,
				'',
			);

			data +=
				`import expected${relatedModelSinglePascal}Object from '../../${relatedModelPluralParam}/expected-objects/expected-${relatedModelSinglularParam}-object'` +
				Character.LINE_BREAK;
		});

		data += Character.LINE_BREAK;
	}

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
			const relatedModelSinglePascal = pascalCase(relatedModel).replace(
				/s$/g,
				'',
			);
			const relatedModelSinglularCamel = camelCase(relatedModel).replace(
				/s$/g,
				'',
			);
			const relatedModelPluralCamel = camelCase(relatedModel);
			const relatedModelSingluarCamel = relatedModelPluralCamel.replace(
				/s$/g,
				'',
			);

			if (isManyToMany || isHasOne) {
				data +=
					`${relatedModelSinglularCamel}: expected${relatedModelSinglePascal}Object,` +
					Character.LINE_BREAK;
			}

			if (isHasMany) {
				data +=
					`${relatedModelPluralCamel}: expect.arrayContaining([ 
					expect.objectContaining({
						${relatedModelSingluarCamel}: expected${relatedModelSinglePascal}Object,
					}),
				]),` + Character.LINE_BREAK;
			}
		});

		data += Character.LINE_BREAK;
	}

	data += bottomFragment;
	data += Character.LINE_BREAK;
	data += exportFragment;

	return data;
};

export default generateExpectedObjectWithRelationFileData;
