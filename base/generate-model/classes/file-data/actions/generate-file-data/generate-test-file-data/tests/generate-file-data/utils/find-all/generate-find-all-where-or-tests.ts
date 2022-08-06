import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindAllWhereOrTests = ({ model }: IProps) => {
	let data = '';
	const { modelValue, modelAttribute } = model.tests.findAll.where;
	const {
		expectedCount,
		modelValue: orModelValue,
		modelAttribute: orModelAttribute,
	} = model.tests.findAll.whereOr;

	data += `describe(\`and the where OR argument aims to fetch ${model.name.plural.pascalCase} with '${modelAttribute}: ${modelValue}' or '${orModelAttribute}: ${orModelValue}'\`, () => {
			it('should return all ${model.name.plural.pascalCase} with that combination', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAll${model.name.plural.pascalCase}Input: {
							where: {
								OR: [{ ${orModelAttribute}: ${orModelValue} }, { ${modelAttribute}: ${modelValue} }],
							},
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const ${model.name.plural.camelCase} = response.body.data.findAll${model.name.plural.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${model.name.plural.camelCase}.length).toBe(${expectedCount});

				${model.name.plural.camelCase}.forEach((${model.name.singular.camelCase}) => {
					expect(${model.name.singular.camelCase}).toEqual(expectedUsersExchangesObject);
				});
			});
		});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindAllWhereOrTests;
