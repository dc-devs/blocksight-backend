import { Character } from '../../../../../../../../../enums';
import generateInputAttributes from './generate-input-values';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneModelTest = ({ model }: IProps) => {
	let data = '';

	const inputAttributes = generateInputAttributes({ model });

	data += `describe('when updating with a valid ${model.name.singular.pascalCase} id and udpate data', () => {
	let update${model.name.singular.pascalCase}Input;

	beforeEach(() => {
		update${model.name.singular.pascalCase}Input = {
			${inputAttributes}
		};
	});

	it('should update ${model.name.singular.pascalCase}', async () => {
		const id = 1;
		const expected${model.name.singular.pascalCase}Response = expect.objectContaining({
			id,
			...update${model.name.singular.pascalCase}Input,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		});
		const graphqlQuery = {
			operationName: 'Mutation',
			query,
			variables: {
				id,
				update${model.name.singular.pascalCase}Input,
			},
		};
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send(graphqlQuery);

		const exchange = response.body.data.update${model.name.singular.pascalCase};

		expect(response.statusCode).toEqual(HttpStatus.OK);
		expect(exchange).toEqual(expected${model.name.singular.pascalCase}Response);
	});
});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelTest;
