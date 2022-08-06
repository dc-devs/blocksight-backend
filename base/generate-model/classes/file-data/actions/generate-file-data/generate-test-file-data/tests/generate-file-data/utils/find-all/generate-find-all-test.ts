import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateCreateNewModelTest = ({ model }: IProps) => {
	let data = '';

	data += `describe('when querying to get all ${model.name.singular.pascalCase}', () => {
	it('should return all ${model.name.singular.pascalCase}', async () => {
		const graphQlquery = {
			operationName: 'Query',
			query,
			variables: {
				findAll${model.name.plural.pascalCase}Input: {},
			},
		};
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send(graphQlquery);

		const ${model.name.plural.camelCase} = response.body.data.findAll${model.name.plural.pascalCase};

		expect(response.statusCode).toEqual(HttpStatus.OK);
		expect(${model.name.plural.camelCase}.length).toEqual(allModelsCount);

		${model.name.plural.camelCase}.forEach((${model.name.singular.camelCase}) => {
			expect(${model.name.singular.camelCase}).toEqual(expected${model.name.singular.pascalCase}Object);
		});
	});
});
`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateNewModelTest;
