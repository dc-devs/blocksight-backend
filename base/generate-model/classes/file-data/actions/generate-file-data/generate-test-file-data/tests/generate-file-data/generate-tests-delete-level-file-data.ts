import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateDeleteImports from './utils/delete/generate-delete-imports';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import generateDeleteModelTest from './utils/delete/generate-delete-model-test';
import { IModel } from '../../../../../../../interfaces/model';
import generateTopValidationFragment from './utils/generate-top-validation-fragment';
import generateBottomValidationFragment from './utils/generate-bottom-validation-fragment';
import generateDeleteInvalidIdTest from './utils/delete/generate-delete-invalid-id-test';

interface IProps {
	model: IModel;
}

const generateTestsDeleteFileData = ({ model }: IProps) => {
	let data = '';
	const imports = generateDeleteImports({ model });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.DELETE),
	});
	const topValidationFragment = generateTopValidationFragment();
	const bottomValidationFragment = generateBottomValidationFragment();
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.DELETE),
	});
	const deleteModelTest = generateDeleteModelTest({
		model,
	});
	const validationNoModelTest = generateDeleteInvalidIdTest({
		model,
	});

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += deleteModelTest;
	data += Character.LINE_BREAK;
	data += topValidationFragment;
	data += Character.LINE_BREAK;
	data += validationNoModelTest;
	data += Character.LINE_BREAK;
	data += bottomValidationFragment;
	data += Character.LINE_BREAK;
	data += bottomTestFragment;

	return data;
};

export default generateTestsDeleteFileData;
