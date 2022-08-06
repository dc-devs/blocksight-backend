import { Character } from '../../../../../../../../../enums';
import generateInputAttributes from './generate-input-values';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneModelTest = ({ model }: IProps) => {
	let data = '';

	const inputAttributes = generateInputAttributes({ model });

	data += `describe('when updating with an invalid ${model.name.singular.pascalCase} id', () => {
		let update${model.name.singular.pascalCase}Input;

		beforeEach(() => {
			update${model.name.singular.pascalCase}Input = {
				${inputAttributes}
			};
		});

		it('should return a error', async () => {
			const id = allModelsCount + 10;
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

			const errors = response.body.errors;
			const error = errors[0];
			const { extensions } = error;

			expect(errors.length).toEqual(1);

			expect(extensions.errors.cause.type).toEqual(
				ExtensionCode.BAD_USER_INPUT,
			);

			expect(extensions.errors.cause.message).toEqual(
				ErrorMessage.UPDATE_RECORD_NOT_FOUND,
			);
		});
	});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneModelTest;
