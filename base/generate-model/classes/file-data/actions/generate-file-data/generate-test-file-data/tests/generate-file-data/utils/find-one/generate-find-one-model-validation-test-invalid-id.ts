import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneModelValidationTestInvalidId = ({ model }: IProps) => {
	let data = '';

	data += `describe('when querying with an id for ${model.name.singular.pascalCase} that does not exist', () => {
		it('should return null', async () => {
			const id = 100;
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

			const ${model.name.singular.camelCase} = response.body.data.findOne${model.name.singular.pascalCase};

			expect(response.statusCode).toEqual(HttpStatus.OK);
			expect(${model.name.singular.camelCase}).toBeNull();
		});
	});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelValidationTestInvalidId;
