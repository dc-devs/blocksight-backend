import { pascalCase } from 'change-case';
import { Character } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

// 	name: expect.any(String),
// 	websiteUrl: expect.any(String),
// 	logoUrl: expect.any(String),
// 	companyLogoUrl: expect.any(String),
// 	hasApi: expect.any(Boolean),
// 	hasCsv: expect.any(Boolean),
// 	createdAt: expect.any(String),
// 	updatedAt: expect.any(String),

const generateExpectedObjectFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { attributes } = modelAttributes.all;
	const topFragment =
		'const expectedObject = expect.objectContaining({' +
		Character.LINE_BREAK;
	const bottomFragment = '});' + Character.LINE_BREAK;
	const exportFragment =
		'export default expectedObject;' + Character.LINE_BREAK;

	data += topFragment;

	data += Character.TAB + 'id: expect.any(Number),' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attributeName) => {
		const attribute = attributes[attributeName];
		const { typeScriptType } = attribute;
		const property = attributeName;
		const value = `expect.any(${pascalCase(typeScriptType)})`;

		data += Character.TAB + `${property}: ${value},` + Character.LINE_BREAK;
	});

	data += bottomFragment;
	data += Character.LINE_BREAK;
	data += exportFragment;

	return data;
};

export default generateExpectedObjectFileData;
