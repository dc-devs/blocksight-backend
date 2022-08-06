import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateUpdateModelValidationTestUniqueAttrs = ({ model }: IProps) => {
	let data = '';
	const { attributes } = model.attributeBundles.unique;

	Object.keys(attributes).forEach((attributeName) => {
		data += `describe('when updating with an ${attributeName} that already exists', () => {
			let update${model.name.singular.pascalCase}Input;
	
			beforeEach(() => {
				update${model.name.singular.pascalCase}Input = {
					${attributeName}: firstRecord.${attributeName},
				};
			});
	
			it('should return an error', async () => {
				const id = 1;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
						data: update${model.name.singular.pascalCase}Input,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);
	
				const errors = response.body.errors;
				const error = errors[0];
				const { extensions } = error;
				const ${attributeName}Error = extensions.errors.${attributeName};
	
				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(errors.length).toEqual(1);
	
				expect(${attributeName}Error.type).toEqual(
					ExtensionCode.BAD_USER_INPUT,
				);
	
				expect(${attributeName}Error.message).toEqual(
					${model.name.singular.pascalCase}ValidationError.${snakeCase(
			attributeName,
		).toUpperCase()}_IS_TAKEN,
				);
			});
		});`;
	});

	data += Character.LINE_BREAK;

	return data;
};

export default generateUpdateModelValidationTestUniqueAttrs;
