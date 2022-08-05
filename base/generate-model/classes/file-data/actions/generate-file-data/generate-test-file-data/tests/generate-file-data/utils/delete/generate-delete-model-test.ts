import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateDeleteModelTest = ({ model }: IProps) => {
	let data = '';

	data += `describe('when deleting with a valid ${model.name.singular.pascalCase} id', () => {
			it('should delete that ${model.name.singular.pascalCase}', async () => {
				const id = allModelsCount;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						delete${model.name.singular.pascalCase}Input:id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const ${model.name.singular.camelCase} = response.body.data.delete${model.name.singular.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${model.name.singular.camelCase}).toEqual(expected${model.name.singular.pascalCase}Object);
			});
		});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateDeleteModelTest;
