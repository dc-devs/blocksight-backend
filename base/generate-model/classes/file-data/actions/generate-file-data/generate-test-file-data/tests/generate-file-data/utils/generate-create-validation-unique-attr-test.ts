import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../../enums';
import generateInputProperties from './generate-input-properties';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateCreateValidationUniqueAttrTests = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { attributes: attributesWithoutTimeStamps } =
		modelAttributes.withoutTimeStamps;
	const { attributes: uniqueAttributets } = modelAttributes.unique;

	Object.keys(uniqueAttributets).forEach((uniqueAttr) => {
		const inputProperties = generateInputProperties({
			attributes: attributesWithoutTimeStamps,
			customValues: {
				[uniqueAttr]: `firstRecord.${uniqueAttr}`,
			},
		});
		const uniqueAttrUpperSnakeCase = snakeCase(uniqueAttr).toUpperCase();
		const validationError = `${uniqueAttrUpperSnakeCase}_IS_TAKEN`;

		data += `describe('${uniqueAttr}', () => {
			describe('when creating an ${modelName.singular.pascalCase} with a ${uniqueAttr} that already exists', () => {
				let create${modelName.singular.pascalCase}Input;
		
				beforeEach(() => {
					create${modelName.singular.pascalCase}Input = {
						${inputProperties}
					};
				});
		
				it('should return an error', async () => {
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							create${modelName.singular.pascalCase}Input,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphqlQuery);
		
					const errors = response.body.errors;
					const error = errors[0];
					const { extensions } = error;
					const ${uniqueAttr}Error = extensions.errors.${uniqueAttr};
		
					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(errors.length).toEqual(1);
		
					expect(${uniqueAttr}Error.type).toEqual(
						ExtensionCode.BAD_USER_INPUT,
					);
		
					expect(${uniqueAttr}Error.message).toEqual(
						${modelName.singular.pascalCase}ValidationError.${validationError},
					);
				});
			});
		});`;

		data += Character.LINE_BREAK;
	});

	return data;
};

export default generateCreateValidationUniqueAttrTests;
