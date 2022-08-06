import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import { IModel } from '../../../../../../../interfaces/model';
import generateFindAllImports from './utils/find-all/generate-find-all-imports';
import generateFindAllTest from './utils/find-all/generate-find-all-test';

interface IProps {
	model: IModel;
}

const generateTestsFindAllFileData = ({ model }: IProps) => {
	let data = '';
	const imports = generateFindAllImports({ model });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.UPDATE),
	});
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.UPDATE),
	});
	const findAllTest = generateFindAllTest({ model });

	data += imports;
	data += Character.LINE_BREAK;
	data += topTestFragment;
	data += Character.LINE_BREAK;
	data += findAllTest;
	data += Character.LINE_BREAK;
	data += bottomTestFragment;

	return data;
};

export default generateTestsFindAllFileData;
