import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const defatulValues = {
	string: 'Updated Value',
	number: 12345,
};

const generateInputAttributes = ({ model }: IProps) => {
	let data = '';
	const { tests } = model;
	const { update } = tests;
	const { customValues } = update;
	const { attributes } = model.attributeBundles.withoutTimeStamps;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const attributeValue =
			customValues[attributeName] || defatulValues[typeScriptType];

		console.log(attributeName, attributeValue);
		data += `${attributeName}: ${attributeValue},` + Character.LINE_BREAK;
	});

	return data;
};

const generateFindOneModelTest = ({ model }: IProps) => {
	let data = '';

	const inputAttributes = generateInputAttributes({ model });

	data += `describe('when updating with an invalid ${model.name.singular.pascalCase} id', () => {
		let update${model.name.singular.pascalCase}Input;

		beforeEach(() => {
			update${model.name.singular.pascalCase}Input = {
				${inputAttributes}
			};
		});

		it('should return a error', async () => {
			const id = 9999;
			const graphqlQuery = {
				operationName: 'Mutation',
				query,
				variables: {
					id,
					update${model.name.singular.pascalCase}Input,
				},
			};
			const response = await request(app.getHttpServer())
				.post('/graphql')
				.send(graphqlQuery);

			const errors = response.body.errors;
			const error = errors[0];
			const { extensions } = error;

			expect(errors.length).toEqual(1);

			expect(extensions.errors.cause.type).toEqual(
				ExtensionCode.BAD_USER_INPUT,
			);

			expect(extensions.errors.cause.message).toEqual(
				ErrorMessage.UPDATE_RECORD_NOT_FOUND,
			);
		});
	});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelTest;
