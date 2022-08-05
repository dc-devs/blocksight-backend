import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import generateFindOneModelTest from './utils/find-one/generate-find-one-model-test';
import { IModel } from '../../../../../../../interfaces/model';
import generateFindOneImports from './utils/find-one/generate-find-one-imports';
import generateTopValidationFragment from './utils/generate-top-validation-fragment';
import generateBottomValidationFragment from './utils/generate-bottom-validation-fragment';
import generateFindOneModelValidationTestInvalidId from './utils/find-one/generate-find-one-model-validation-test-invalid-id';
import generateFindOneModelValidationTestNoData from './utils/find-one/generate-find-one-model-validation-test-no-data';
import generateFindOneModelUniqueAttributeTests from './utils/find-one/generate-find-one-model-unique-attribute-tests';

interface IProps {
	model: IModel;
}

// LEFT OFF first Find one test passing

const generateTestsFindOneFileData = ({ model }: IProps) => {
	let data = '';

	const imports = generateFindOneImports({ model });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.FIND_ONE),
	});
	const topValidationFragment = generateTopValidationFragment();
	const bottomValidationFragment = generateBottomValidationFragment();
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.FIND_ONE),
	});
	const findOneModelTest = generateFindOneModelTest({
		model,
	});
	const findOneModelValidationTestInvalidId =
		generateFindOneModelValidationTestInvalidId({
			model,
		});
	const findOneModelValidationTestNoData =
		generateFindOneModelValidationTestNoData({
			model,
		});
	const findOneModelUniqueAttributeTests =
		generateFindOneModelUniqueAttributeTests({
			model,
		});

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += findOneModelTest;
	data += Character.LINE_BREAK;
	data += topValidationFragment;
	data += Character.LINE_BREAK;
	data += findOneModelValidationTestInvalidId;
	data += Character.LINE_BREAK;
	data += findOneModelValidationTestNoData;
	data += Character.LINE_BREAK;
	data += bottomValidationFragment;
	data += Character.LINE_BREAK;
	data += findOneModelUniqueAttributeTests;
	data += Character.LINE_BREAK;
	data += bottomTestFragment;

	return data;
};

export default generateTestsFindOneFileData;
