import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestsCreateFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = `
	import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { coinbasePro } from '../../../../prisma/seeds/${modelName.plural.paramCase}.seed';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { ${modelName.singular.pascalCase}ValidationError } from '../../../../src/models/${modelName.plural.paramCase}/enums';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expected${modelName.singular.pascalCase}Object from '../expected-objects/expected-${modelName.singular.paramCase}-object';

const runCreateTests = () => {
	describe('Create', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when creating a new ${modelName.singular.pascalCase} with valid inputs', () => {
			const create${modelName.singular.pascalCase}Input = {
				name: 'New Exchnage',
				websiteUrl: 'https://new-${modelName.singular.pascalCase}.com/',
				logoUrl: 'https://new-${modelName.singular.pascalCase}.com/logo',
				companyLogoUrl: 'https://new-${modelName.singular.pascalCase}.com/company-logo',
				hasApi: true,
				hasCsv: true,
			};

			it('should create and return that ${modelName.singular.pascalCase}', async () => {
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

				const ${modelName.singular.pascalCase} = response.body.data.create${modelName.singular.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${modelName.singular.pascalCase}).toEqual(expected${modelName.singular.pascalCase}Object);
			});
		});

		describe('validation', () => {
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
							name: coinbasePro.name,
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
	});
};

export default runCreateTests;
`;

	return data;
};

export default generateTestsCreateFileData;
