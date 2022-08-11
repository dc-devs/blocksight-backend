import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindAllWhereTests = ({ model }: IProps) => {
	let data = '';
	const {
		modelValue: modelValueRaw,
		expectedCount,
		modelAttribute,
	} = model.tests.findAll.where;

	const modelValue =
		typeof modelValueRaw === 'string'
			? `"${modelValueRaw}"`
			: modelValueRaw;

	data += `describe(\`when querying and the where argument aims to fetch ${model.name.singular.pascalCase} with '${modelAttribute}: ${modelValue}'\`, () => {
	it('should return all ${model.name.singular.pascalCase} with that ${modelAttribute}', async () => {
		const graphQlquery = {
			operationName: 'Query',
			query,
			variables: {
				findAll${model.name.plural.pascalCase}Input: {
					where: {
						${modelAttribute}: ${modelValue},
					},
				},
			},
		};

		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send(graphQlquery);

		const ${model.name.plural.camelCase} = response.body.data.findAll${model.name.plural.pascalCase};

		expect(response.statusCode).toEqual(HttpStatus.OK);
		expect(${model.name.plural.camelCase}).toHaveLength(${expectedCount});

		${model.name.plural.camelCase}.forEach((${model.name.singular.camelCase}) => {
			expect(${model.name.singular.camelCase}).toEqual(expected${model.name.singular.pascalCase}Object);
			expect(${model.name.singular.camelCase}.${modelAttribute}).toEqual(${modelValue});
		});
	});
});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindAllWhereTests;
