import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateDeleteInvalidIdTest = ({ model }: IProps) => {
	let data = '';

	data += `describe('when deleting with an invalid exchange id', () => {
	it('should delete that exchange', async () => {
		const id = 100;
		const graphqlQuery = {
			operationName: 'Mutation',
			query,
			variables: {
				delete${model.name.singular.pascalCase}Input: id,
			},
		};
		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send(graphqlQuery);

		const errors = response.body.errors;
		const prismaError = errors[0];
		const exception = prismaError.extensions.exception;

		expect(errors.length).toEqual(1);

		expect(prismaError.message).toContain(
			GraphQLErrorMessage.DATABASE_ERROR,
		);

		expect(exception.code).toEqual(ErrorCode.RECORD_NOT_FOUND);

		expect(exception.meta.cause).toContain(
			ErrorMessage.DELETE_RECORD_NOT_FOUND,
		);
	});
});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateDeleteInvalidIdTest;
