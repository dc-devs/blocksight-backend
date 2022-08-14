import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindAllWhereNotTests = ({ model }: IProps) => {
	let data = '';
	const { modelValue: modelValueRaw, modelAttribute } =
		model.tests.findAll.where;
	const {
		expectedCount,
		modelValue: notModelValueRaw,
		modelAttribute: notModelAttribute,
	} = model.tests.findAll.whereNot;

	const modelValue =
		typeof modelValueRaw === 'string'
			? `"${modelValueRaw}"`
			: modelValueRaw;

	const notModelValue =
		typeof notModelValueRaw === 'string'
			? `"${notModelValueRaw}"`
			: notModelValueRaw;

	data += `describe(\`when querying and the where NOT argument aims to fetch ${
		model.name.plural.pascalCase
	} with '${modelAttribute}: ${modelValue}' and not '${notModelAttribute}: ${notModelValue}'\`, () => {
			it('should return all ${
				model.name.plural.pascalCase
			} with that combination', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAll${model.name.plural.pascalCase}Input: {
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

				const ${model.name.plural.camelCase} = response.body.data.findAll${
		model.name.plural.pascalCase
	};
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
