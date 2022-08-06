import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import { IModel } from '../../../../../../../interfaces/model';
import generateUpdateImports from './utils/update/generate-update-imports';
import generateTopValidationFragment from './utils/generate-top-validation-fragment';
import generateBottomValidationFragment from './utils/generate-bottom-validation-fragment';
import generateUpdateModelTest from './utils/update/generate-update-model-test';
import generateUpdateModelValidationTestInvalidId from './utils/update/generate-update-model-validation-test-invalid-id';
import generateUpdateModelValidationTestUniqueAttrs from './utils/update/generate-update-model-validation-test-unique-attrs';

interface IProps {
	model: IModel;
}

const generateTestsUpdateFileData = ({ model }: IProps) => {
	let data = '';
	const { hasUniqueProps } = model;
	const imports = generateUpdateImports({ model });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.UPDATE),
	});
	const topValidationFragment = generateTopValidationFragment();
	const bottomValidationFragment = generateBottomValidationFragment();
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.UPDATE),
	});
	const updateModelTest = generateUpdateModelTest({
		model,
	});
	const updateModelValidationTestInvalidId =
		generateUpdateModelValidationTestInvalidId({
			model,
		});
	const updateModelValidationTestUniqueAttrs =
		generateUpdateModelValidationTestUniqueAttrs({
			model,
		});

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += updateModelTest;
	data += Character.LINE_BREAK;
	data += topValidationFragment;
	data += Character.LINE_BREAK;
	data += updateModelValidationTestInvalidId;
	data += Character.LINE_BREAK;
	data += bottomValidationFragment;
	data += Character.LINE_BREAK;

	if (hasUniqueProps) {
		data += updateModelValidationTestUniqueAttrs;
		data += Character.LINE_BREAK;
	}

	data += bottomTestFragment;

	return data;
};

export default generateTestsUpdateFileData;
