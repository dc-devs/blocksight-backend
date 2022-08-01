import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateCreateImports from './utils/generate-create-imports';
import { IModelName } from '../../../../../../../interfaces/model-name';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import generateCreateNewModelTest from './utils/generate-create-new-model-test';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const imports = generateCreateImports({ modelName });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.CREATE),
	});
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.CREATE),
	});
	const newModelTest = generateCreateNewModelTest({
		modelName,
		modelAttributes,
	});

	data += imports + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += topTestFragment + Character.LINE_BREAK;
	data += Character.LINE_BREAK;
	data += newModelTest;
	data += Character.LINE_BREAK;

	data += `describe('validation', () => {
			describe('when creating with no data', () => {
				let create${modelName.singular.pascalCase}Input;
				let errorResponseMessage: string[];

				beforeEach(() => {
					create${modelName.singular.pascalCase}Input = {};
					errorResponseMessage = [
						ErrorMessage.NAME_MUST_BE_A_STRING,
						ErrorMessage.WEBSITE_URL_MUST_BE_A_STRING,
						ErrorMessage.LOGO_URL_MUST_BE_A_STRING,
						ErrorMessage.COMPANY_LOGO_URL_MUST_BE_A_STRING,
						ErrorMessage.HAS_API_MUST_BE_A_BOOLEAN,
						ErrorMessage.HAS_CSV_MUST_BE_A_BOOLEAN,
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

					console.log(errorResponse.message);
					console.log(errorResponseMessage);

					expect(errorResponse.message).toEqual(
						expect.arrayContaining(errorResponseMessage),
					);
				});
			});

			describe('name', () => {
				describe('when creating an ${modelName.singular.pascalCase} with a name that already exists', () => {
					let create${modelName.singular.pascalCase}Input;

					beforeEach(() => {
						create${modelName.singular.pascalCase}Input = {
							name: firstRecord.name,
							websiteUrl: 'https://new-${modelName.singular.pascalCase}.com/',
							logoUrl: 'https://new-${modelName.singular.pascalCase}.com/logo',
							companyLogoUrl:
								'https://new-${modelName.singular.pascalCase}.com/company-logo',
							hasApi: true,
							hasCsv: true,
						};
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
						console.log(response.body);
						const errors = response.body.errors;
						const error = errors[0];
						const { extensions } = error;
						const nameError = extensions.errors.name;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(errors.length).toEqual(1);

						expect(nameError.type).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(nameError.message).toEqual(
							${modelName.singular.pascalCase}ValidationError.NAME_IS_TAKEN,
						);
					});
				});
			});
		});
`;
	data += bottomTestFragment;

	return data;
};

export default generateTestsCreateFileData;
