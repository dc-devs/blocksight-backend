import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindAllWhereNotTests = ({ model }: IProps) => {
	let data = '';
	const { modelValue, modelAttribute } = model.tests.findAll.where;
	const {
		expectedCount,
		modelValue: notModelValue,
		modelAttribute: notModelAttribute,
	} = model.tests.findAll.whereNot;

	data += `describe(\`when querying and the where NOT argument aims to fetch ${
		model.name.plural.pascalCase
	} with '${modelAttribute}: ${modelValue}'' and not '${notModelAttribute}: ${notModelValue}'\`, () => {
			it('should return all ${
				model.name.plural.pascalCase
			} with that combination', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAll${model.name.singular.pascalCase}Input: {
							where: {
								${modelAttribute}: ${modelValue},
								NOT: [{ '${notModelAttribute}': ${notModelValue} }],
							},
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);
				console.log(response.body);
				const ${model.name.plural.camelCase} = response.body.data.findAllUsersExchanges;
				const ${model.name.singular.camelCase.replace(/s$/g, '')} = ${
		model.name.plural.camelCase
	}[0];

				expect(response.statusCode).toEqual(HttpStatus.OK);

				expect(${model.name.plural.camelCase}).toHaveLength(${expectedCount});

				expect(${model.name.singular.camelCase.replace(/s$/g, '')}).toEqual(expected${
		model.name.singular.pascalCase
	}Object);
				expect(${model.name.singular.camelCase.replace(
					/s$/g,
					'',
				)}.${modelAttribute}).toEqual(${modelValue});
			});
		});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindAllWhereNotTests;
