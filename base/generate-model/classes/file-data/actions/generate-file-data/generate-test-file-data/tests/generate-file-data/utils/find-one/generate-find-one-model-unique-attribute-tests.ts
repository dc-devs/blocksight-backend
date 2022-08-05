import { Character, TypeScriptType } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneModelUniqueAttributeTests = ({ model }: IProps) => {
	let data = '';
	const { attributes: uniqueAttributets } = model.attributeBundles.unique;

	Object.keys(uniqueAttributets).forEach((uniqueAttribute) => {
		const attribute = uniqueAttributets[uniqueAttribute];
		const { typeScriptType } = attribute;
		const nonExistentValue =
			typeScriptType === TypeScriptType.STRING
				? 'non-existent-model-12345'
				: 9999;

		data += `describe('when querying with a ${uniqueAttribute} for an ${model.name.singular.pascalCase} that does exist', () => {
			it('should return ${model.name.singular.pascalCase}', async () => {
				const ${uniqueAttribute} = firstRecord.${uniqueAttribute};
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findOne${model.name.singular.pascalCase}Input: {
							${uniqueAttribute},
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const ${model.name.singular.camelCase} = response.body.data.findOne${model.name.singular.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${model.name.singular.camelCase}.${uniqueAttribute}).toEqual(${uniqueAttribute});
				expect(${model.name.singular.camelCase}).toEqual(expected${model.name.singular.pascalCase}Object);
			});

			describe('validation', () => {
				describe('when querying with an ${uniqueAttribute} for ${model.name.singular.pascalCase} that does not exist', () => {
					it('should return null', async () => {
						const ${uniqueAttribute} = ${nonExistentValue};
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findOne${model.name.singular.pascalCase}Input: {
									${uniqueAttribute},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const ${model.name.singular.camelCase} = response.body.data.findOne${model.name.singular.pascalCase};

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(${model.name.singular.camelCase}).toBeNull();
					});
				});
			});
		});`;
	});

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelUniqueAttributeTests;
