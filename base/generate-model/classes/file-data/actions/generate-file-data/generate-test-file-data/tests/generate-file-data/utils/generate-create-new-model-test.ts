import { Character } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import generateInputProperties from './generate-input-properties';
import { IModelAttributes } from '../../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateCreateNewModelTest = ({ modelName, modelAttributes }: IProps) => {
	let data = '';
	const { attributes } = modelAttributes.withoutTimeStamps;
	const inputProperties = generateInputProperties({ attributes });

	data += `describe('when creating a new ${modelName.singular.pascalCase} with valid inputs', () => {
			const create${modelName.singular.pascalCase}Input = {
				${inputProperties}
			};

			it('should create and return ${modelName.singular.pascalCase}', async () => {
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

				const ${modelName.singular.camelCase} = response.body.data.create${modelName.singular.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${modelName.singular.camelCase}).toEqual(expected${modelName.singular.pascalCase}Object);
			});
		});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateNewModelTest;
