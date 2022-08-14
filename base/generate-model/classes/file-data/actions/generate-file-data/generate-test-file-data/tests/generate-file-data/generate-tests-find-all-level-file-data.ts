import { pascalCase } from 'change-case';
import { Character, Crud } from '../../../../../../../enums';
import generateTopTestFragment from './utils/generate-top-test-fragment';
import generateBottomTestFragment from './utils/generate-bottom-test-fragment';
import { IModel } from '../../../../../../../interfaces/model';
import generateFindAllImports from './utils/find-all/generate-find-all-imports';
import generateFindAllTest from './utils/find-all/generate-find-all-test';
import generateFindAllWhereTest from './utils/find-all/generate-find-all-where-tests';
import generateFindAllWhereNotTest from './utils/find-all/generate-find-all-where-not-tests';
import generateFindAllWhereOrTest from './utils/find-all/generate-find-all-where-or-tests';
import generateFindAllPaginationSkipTest from './utils/find-all/generate-find-all-pagination-skip-tests';
import generateFindAllPaginationCursorTest from './utils/find-all/generate-find-all-pagination-cursor-tests';

interface IProps {
	model: IModel;
}

const generateTestsFindAllFileData = ({ model }: IProps) => {
	let data = '';
	const bottomFragment = `});`;
	const topWhereFragment = `describe('where', () => {`;
	const topPaginationFragment = `describe('pagination', () => {`;
	const imports = generateFindAllImports({ model });
	const topTestFragment = generateTopTestFragment({
		testName: pascalCase(Crud.FIND_ALL),
	});
	const bottomTestFragment = generateBottomTestFragment({
		testName: pascalCase(Crud.FIND_ALL),
	});
	const findAllTest = generateFindAllTest({ model });
	const findAllWhereTest = generateFindAllWhereTest({ model });
	const findAllWhereNotTest = generateFindAllWhereNotTest({ model });
	const findAllWhereOrTest = generateFindAllWhereOrTest({ model });
	const findAllPaginationSkipTest = generateFindAllPaginationSkipTest({
		model,
	});
	const findAllPaginationCursorTest = generateFindAllPaginationCursorTest({
		model,
	});

	data += imports;
	data += Character.LINE_BREAK;

	data += topTestFragment;
	data += Character.LINE_BREAK;

	data += findAllTest;
	data += Character.LINE_BREAK;

	data += topWhereFragment;
	data += Character.LINE_BREAK;
	data += findAllWhereTest;
	data += Character.LINE_BREAK;
	data += findAllWhereNotTest;
	data += Character.LINE_BREAK;
	data += findAllWhereOrTest;
	data += Character.LINE_BREAK;
	data += bottomFragment;
	data += Character.LINE_BREAK;

	data += Character.LINE_BREAK;

	data += topPaginationFragment;
	data += Character.LINE_BREAK;
	data += findAllPaginationSkipTest;
	data += Character.LINE_BREAK;
	data += findAllPaginationCursorTest;
	data += Character.LINE_BREAK;
	data += bottomFragment;
	data += Character.LINE_BREAK;

	data += Character.LINE_BREAK;

	data += bottomTestFragment;

	return data;
};

export default generateTestsFindAllFileData;
