import { snakeCase } from 'change-case';
import { Character } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import {
	IModelAttributes,
	IAttributes,
} from '../../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateErrorMessages = (attributes: IAttributes) => {
	let data = '';
	const errorBase = 'must be a';

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const enumValue = snakeCase(
			`${attributeName} ${errorBase} ${typeScriptType}`,
		).toUpperCase();
		data +=
			Character.TAB + `ErrorMessage.${enumValue},` + Character.LINE_BREAK;
	});

	return data;
};

const generateCreateValidationNoDataTest = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { attributes } = modelAttributes.withoutTimeStamps;
	const errorMessages = generateErrorMessages(attributes);

	data += `describe('when creating with no data', () => {
	let create${modelName.singular.pascalCase}Input;
	let errorResponseMessage: string[];

	beforeEach(() => {
		create${modelName.singular.pascalCase}Input = {};
		errorResponseMessage = [
			${errorMessages}
		];
	});

	it('should return an error', async () => {
		const graphqlQuery = {
			operationName: 'Mutation',
			query,
			variables: {
				create${modelName.singular.pascalCase}Input,
			},
		};

		const response = await request(app.getHttpServer())
			.post('/graphql')
			.send(graphqlQuery);

		const errors = response.body.errors;
		const error = errors[0];
		const { extensions } = error;
		const { code, response: errorResponse } = extensions;

		expect(response.statusCode).toEqual(HttpStatus.OK);
		expect(errors.length).toEqual(1);

		expect(code).toEqual(ExtensionCode.BAD_USER_INPUT);

		expect(errorResponse.message).toEqual(
			expect.arrayContaining(errorResponseMessage),
		);
	});
});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateValidationNoDataTest;
