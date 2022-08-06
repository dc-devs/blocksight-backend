import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindAllPaginationCursorTest = ({ model }: IProps) => {
	let data = '';
	const { cursor, take } = model.tests.findAll.pagination;

	data += `describe('when querying and the cursor and take arguments are used to implement pagination', () => {
		describe('and the cursor param is ${cursor}, and the take param is ${take}', () => {
			it('should return the first ${take} ${model.name.plural.pascalCase}', async () => {
				const cursor = ${cursor};
				const take = ${take};
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAll${model.name.plural.pascalCase}Input: {
							cursor,
							take,
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const ${model.name.plural.camelCase} =
					response.body.data.findAll${model.name.plural.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${model.name.plural.camelCase}).toHaveLength(take);

				${model.name.plural.camelCase}.forEach((${model.name.singular.camelCase}) => {
					expect(${model.name.singular.camelCase}).toEqual(
						expected${model.name.singular.pascalCase}Object,
					);
				});

				const last${model.name.singular.pascalCase} =
					${model.name.plural.camelCase}[${model.name.plural.camelCase}.length - 1];
				const last${model.name.singular.pascalCase}Id = cursor.id + take - 1;
				expect(last${model.name.singular.pascalCase}.id).toEqual(last${model.name.singular.pascalCase}Id);
			});
		});
	});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindAllPaginationCursorTest;
