import { Character, TypeScriptType } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';
import {
	IModelAttributes,
	IAttributes,
} from '../../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const testValues = {
	[TypeScriptType.NUMBER]: 1,
	[TypeScriptType.STRING]: 'Test value',
	[TypeScriptType.BOOLEAN]: true,
};

const generateInputProperties = (attributes: IAttributes) => {
	let data = '';

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const property = attributeName;
		const value = testValues[typeScriptType];

		data += `${property}: ${value},`;
		data += Character.LINE_BREAK;
	});

	return data;
};

const generateCreateNewModelTest = ({ modelName, modelAttributes }: IProps) => {
	let data = '';
	const { attributes } = modelAttributes.withoutTimeStamps;
	const inputProperties = generateInputProperties(attributes);

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

				const ${modelName.singular.pascalCase} = response.body.data.create${modelName.singular.pascalCase};

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(${modelName.singular.pascalCase}).toEqual(expected${modelName.singular.pascalCase}Object);
			});
		});`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateNewModelTest;
