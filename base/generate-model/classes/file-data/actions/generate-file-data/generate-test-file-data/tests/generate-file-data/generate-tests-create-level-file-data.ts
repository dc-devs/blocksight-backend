import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateCreateImports from './utils/generate-create-imports';
import { IModelName } from '../../../../../../../interfaces/model-name';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import generateCreateNewModelTest from './utils/generate-create-new-model-test';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';
import generateTopValidationFragment from './utils/generate-top-validation-fragment';
import generateBottomValidationFragment from './utils/generate-bottom-validation-fragment';
import generateCreateValidationNoDataTest from './utils/generate-create-validation-no-data-test';
import generateCreateValidationUniqueAttrTest from './utils/generate-create-validation-unique-attr-test';

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
	const topValidationFragment = generateTopValidationFragment();
	const bottomValidationFragment = generateBottomValidationFragment();
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.CREATE),
	});
	const createNewModelTest = generateCreateNewModelTest({
		modelName,
		modelAttributes,
	});
	const validationNoDataTest = generateCreateValidationNoDataTest({
		modelName,
		modelAttributes,
	});
	const validationUniqueAttrTest = generateCreateValidationUniqueAttrTest({
		modelName,
		modelAttributes,
	});

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += createNewModelTest;
	data += Character.LINE_BREAK;
	data += topValidationFragment;
	data += Character.LINE_BREAK;
	data += validationNoDataTest;
	data += Character.LINE_BREAK;
	data += validationUniqueAttrTest;
	data += Character.LINE_BREAK;
	data += bottomValidationFragment;
	data += Character.LINE_BREAK;

	data += bottomTestFragment;

	return data;
};

export default generateTestsCreateFileData;
