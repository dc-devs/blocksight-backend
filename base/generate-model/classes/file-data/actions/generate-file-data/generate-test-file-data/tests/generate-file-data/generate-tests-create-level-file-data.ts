import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateCreateImports from './utils/create/generate-create-imports';
import { IModelName } from '../../../../../../../interfaces/model-name';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import generateCreateModelTest from './utils/create/generate-create-new-model-test';
import { IModel } from '../../../../../../../interfaces/model';
import generateTopValidationFragment from './utils/generate-top-validation-fragment';
import generateBottomValidationFragment from './utils/generate-bottom-validation-fragment';
import generateCreateValidationNoDataTest from './utils/create/generate-create-validation-no-data-test';
import generateCreateValidationUniqueAttrTest from './utils/create/generate-create-validation-unique-attr-test';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateTestsCreateFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const imports = generateCreateImports({
		modelName,
		model,
	});
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.CREATE),
	});
	const topValidationFragment = generateTopValidationFragment();
	const bottomValidationFragment = generateBottomValidationFragment();
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.CREATE),
	});
	const createModelTest = generateCreateModelTest({
		modelName,
		model,
	});
	const validationNoDataTest = generateCreateValidationNoDataTest({
		modelName,
		model,
	});
	const validationUniqueAttrTest = generateCreateValidationUniqueAttrTest({
		modelName,
		model,
	});

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += createModelTest;
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
