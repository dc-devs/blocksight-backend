import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneModelTest = ({ model }: IProps) => {
	let data = '';

	data += `describe('when querying with an id for a ${model.name.singular.pascalCase} that does exist', () => {
		it('should return ${model.name.singular.pascalCase}', async () => {
			const id = 1;
			const graphQlquery = {
				operationName: 'Query',
				query,
				variables: {
					findOne${model.name.singular.pascalCase}Input: {
						id,
					},
				},
			};

			const response = await request(app.getHttpServer())
				.post('/graphql')
				.send(graphQlquery);

			const  ${model.name.singular.camelCase} = response.body.data.findOne${model.name.singular.pascalCase};

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect( ${model.name.singular.camelCase}.id).toEqual(id);
			expect( ${model.name.singular.camelCase}).toEqual(expected${model.name.singular.pascalCase}Object);
		});
	});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelTest;
